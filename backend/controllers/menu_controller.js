/**
 * @file menu_controller.js
 * @module MenuController
 * @description Contains the controller functions for menu routes
 */
import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import Menu from "../models/menu.js";

const MenuController = {
    getMenus: async (req, res) => {
        const { page=1, limit=5 } = req.query;
        const offset = page * limit - limit;
        const menus = await Menu.findAll({
            limit: limit,
            offset: offset,
            attributes: { exclude: ["createdAt", "updatedAt"] },
        });
        return res.status(StatusCodes.OK).json({ success: true, data: menus });
    },

    getMenu: async (req, res) => {
        const { id } = req.params;
        const menu = await Menu.findOne({
            where: { id: id },
            attributes: { exclude: ["createdAt", "updatedAt"] },
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

        const existingMenu = await Menu.findOne({ where: { name: name } });
        if (existingMenu) {
            throw new CustomError.BadRequest("Menu already exists");
        }
        const menu = await Menu.create({
            name,
            description,
            price,
            category,
            imageUrl,
            isAvailable,
        });
        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, data: menu });
    },

    deleteMenu: async (req, res) => {
        const { id } = req.params;
        const menu = await Menu.findOne({ where: { id: id } });
        if (!menu) {
            throw new CustomError.NotFound("Menu not found");
        }
        await menu.destroy();
        return res.status(StatusCodes.OK).json({ success: true, data: {} });
    },

    changeAvailability: async (req, res) => {
        const { id } = req.params;
        const { isAvailable } = req.body;
        const menu = await Menu.findOne({ where: { id: id } });
        if (!menu) {
            throw new CustomError.NotFound("Menu not found");
        }
        menu.isAvailable = isAvailable;
        await menu.save();
        return res.status(StatusCodes.OK).json({ success: true, data: menu });
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
        return res.status(StatusCodes.OK).json({ success: true, data: menu });
    },
};

export default MenuController;