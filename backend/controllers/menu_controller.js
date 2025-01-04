/**
 * @file menu_controller.js
 * @module MenuController
 * @description Contains the controller functions for menu routes
 */
import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import Menu from "../models/menu.js";
import { isUuidv4 } from "../utils/index.js";

const MenuController = {
    getMenus: async (req, res) => {
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            throw new CustomError.BadRequest("Invalid pagination values");
        }
        const offset = page * limit - limit;

        const menus = await Menu.findAll({
            limit: limit,
            offset: offset,
        });
        return res.status(StatusCodes.OK).json({ success: true, data: menus });
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
        const { name, description, price, category, imageUrl, isAvailable } =
            req.body;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !imageUrl ||
            isAvailable === undefined
        ) {
            throw new CustomError.BadRequest("All fields are required");
        }

        if (isNaN(parseInt(price, 10))) {
            throw new CustomError.BadRequest("Price must be number");
        }

        const existingMenu = await Menu.findOne({ where: { name: name } });
        if (existingMenu) {
            throw new CustomError.BadRequest("Menu already exists");
        }
        const menu = await Menu.create({
            name,
            description,
            price,
            category,
            imageUrl: [imageUrl],
            isAvailable: isAvailable == "true" ? true : false,
        });
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, message: "Menu created", data: menu });
    },

    deleteMenu: async (req, res) => {
        const { id } = req.params;
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
        const { isAvailable } = req.body;
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
};

export default MenuController;
