/**
 * @file menu_controller.js
 * @module MenuController
 * @description Contains the controller functions for menu routes
 */
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import CustomError from "../error/index.js";
import Menu from "../models/menu.js";
import { isUuidv4 } from "../utils/index.js";
import { menuCategories, menuCategoriesType, BaseURL } from "../config/config.js";
import { multiResolution } from "../utils/file_utils.js";

const MenuController = {
    getMenus: async (req, res) => {
        let { page = 1, limit = 10, query = "", category = "" } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        console.log(
            "================",
            `limit ${limit}, page ${page}, query ${query} category ${category}`
        );
        
        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            throw new CustomError.BadRequest("Invalid pagination values");
        }
        const offset = page * limit - limit;

        const menus = await Menu.findAll({
            // where: category ? { category: category } : {},
            where: {
                isAvailable: true,
                category: category ? category : { [Op.like]: "%" },
            },
            order: [["createdAt", "DESC"]],
            limit: limit,
            offset: offset,
        });

        const formattedMenus = menus.map((menu) => ({
            ...menu.dataValues,
            imageUrl: menu.imageUrl.map(
                (img) => `${BaseURL}/api/v1/images/menu/${img}`
            ),
        }));

        let totalCount;
        if (query !== "" && category !== "") {
            totalCount = await Menu.count();
        } else {
            totalCount = await Menu.count({
                where: {
                    name: {
                        // Case-insensitive search on name (SQLite handles this automatically)
                        [Op.like]: `%${query}%`,
                    },
                    // If category is provided, search for it, otherwise search for all categories
                    category: category ? category : { [Op.like]: "%" },
                },
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            data: { menus: formattedMenus, length: totalCount },
        });
    },

    getMenu: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }

        const menu = await Menu.findOne({
            where: { id: id },
        });
        if (!menu) {
            throw new CustomError.NotFound("Menu not found");
        }
        return res.status(StatusCodes.OK).json({ success: true, data: menu });
    },

    createMenu: async (req, res) => {
        const menu_image = req.file;
        let { name, description, price, category, isAvailable } = req.body;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !menu_image ||
            isAvailable === undefined
        ) {
            throw new CustomError.BadRequest("All fields are required");
        }

        if (isNaN(parseInt(price, 10))) {
            throw new CustomError.BadRequest("Price must be number");
        }

        if (!menuCategories.includes(category)) {
            category = "unknown";
        }

        if (!req.file) {
            throw new CustomError.BadRequest("image field is required");
        }

        const existingMenu = await Menu.findOne({ where: { name: name } });
        if (existingMenu) {
            throw new CustomError.BadRequest("Menu already exists");
        }
        
        multiResolution(menu_image);

        const menu = await Menu.create({
            name,
            description,
            price,
            category,
            imageUrl: menu_image ? [menu_image.filename?.split("temp-")[1]] : [],
            isAvailable: isAvailable == "true" ? true : false,
        });
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, message: "Menu created", data: { menu: 'temp' } });
    },

    deleteMenu: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }

        const menu = await Menu.findOne({ where: { id: id } });
        if (!menu) {
            throw new CustomError.NotFound("Menu not found");
        }
        await menu.destroy();
        return res
            .status(StatusCodes.OK)
            .json({ success: true, message: "Menu deleted", data: {} });
    },

    changeAvailability: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }

        const { isAvailable } = req.body;
        if (isAvailable === undefined) {
            throw new CustomError.BadRequest("isAvailable field is required");
        }
        const menu = await Menu.findOne({ where: { id: id } });
        if (!menu) {
            throw new CustomError.NotFound("Menu not found");
        }
        menu.isAvailable = isAvailable == "true" ? true : false;
        await menu.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Availability changed",
            data: menu,
        });
    },

    updateMenu: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }

        const { name, description, price, category, imageUrl, isAvailable } =
            req.body;
        const menu = await Menu.findOne({ where: { id: id } });
        if (!menu) {
            throw new CustomError.BadRequest("Menu not found");
        }
        // Update only the fields provided in the request body
        if (name !== undefined) menu.name = name;
        if (description !== undefined) menu.description = description;
        if (price !== undefined) menu.price = price;
        if (category !== undefined) menu.category = category;
        if (imageUrl !== undefined) menu.imageUrl = imageUrl;
        if (isAvailable !== undefined) menu.isAvailable = isAvailable;

        await menu.save();
        return res
            .status(StatusCodes.OK)
            .json({ success: true, message: "Menu updated", data: menu });
    },

    getCategories: async (req, res) => {
        return res
            .status(StatusCodes.OK)
            .json({ success: true, data: { categories: menuCategoriesType } });
    },
};

export default MenuController;
