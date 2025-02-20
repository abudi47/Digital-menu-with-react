/**
 * @file table_controller.js
 * @module TableController
 * @description Contains the controller functions for table routes
 */
import { StatusCodes } from "http-status-codes";
import fs from "fs";
import CustomError from "../error/index.js";
import Table from "../models/table.js";
import { tableCategories } from "../config/config.js";
import { isUuidv4 } from "../utils/index.js";
import { QRcodeGenerator } from "../utils/index.js";

const TableController = {
    async getTables(req, res) {
        try {
            // Extract query parameters
            let { page = 1, limit = 10, query = "", category = "" } = req.query;
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);

            // Validate pagination values
            if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
                throw new CustomError.BadRequest("Invalid pagination values");
            }

            // Calculate offset
            const offset = (page - 1) * limit;

            // Build the query options
            const queryOptions = {
              order: [["createdAt", "DESC"]],
                limit: limit,
                offset: offset,
            };

            // Add filtering logic if query or category is provided
            if (query || category) {
                queryOptions.where = {};
                if (query) {
                    queryOptions.where.firstName = { [Op.like]: `%${query}%` }; // Example: Filter by firstName
                }
                if (category) {
                    queryOptions.where.role = category; // Example: Filter by role
                }
            }

            // Fetch paginated users
            const users = await Table.findAll(queryOptions);

            // Count total number of users (with filters applied, if any)
            const totalUsers = await Table.count({ where: queryOptions.where });

            // Return response
            return res.status(StatusCodes.OK).json({
                success: true,
                message: "Users retrieved successfully",
                data: users,
                total: totalUsers, // Send total count to the frontend
                page: page,
                limit: limit,
            });
        } catch (error) {
            console.error("Error fetching users:", error);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "Something went wrong while fetching users",
            });
        }
    },
    async getTable(req, res) {
        const { id } = req.params;
        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }
        const table = await Table.findOne({
            where: { id: id },
        });
        if (!table) {
            throw new CustomError.NotFound("Table not found");
        }
        return res
            .status(StatusCodes.OK)
            .json({ success: true, data: { table } });
    },

    createTable: async (req, res) => {
        const { number, price, category, isAvailable = "true" } = req.body;
        if (!number || !price || !category || isAvailable === undefined) {
            throw new CustomError.BadRequest("All fields are required");
        }
        
        if (!tableCategories.includes(category)) {
            throw new CustomError.BadRequest("Unsupported category");
        }

        const existingTable = await Table.findOne({
            where: { number: number },
        });
        if (existingTable) {
            throw new CustomError.BadRequest("Table already exists");
        }

        const table = new Table({
            number,
            price,
            category,
            isAvailable: isAvailable == "true" || isAvailable == true ? true : false,
        });

        const fileName = await QRcodeGenerator(table.id);

        if (!fileName) {
            throw new CustomError.BadRequest(
                "Can't able to create QR identifier"
            );
        }

        table.imageUrl = fileName;

        await table.save();

        return res
            .status(StatusCodes.CREATED)
            .json({ success: true, message: "Table created", data: { table } });
    },

    updateTable: async (req, res) => {
        const { id } = req.params;
        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }
        const { number, price, category, imageUrl, isAvailable } = req.body;
        if (!number || !price || !category || isAvailable === undefined) {
            throw new CustomError.BadRequest("All fields are required");
        }

        if (!tableCategories.includes(category)) {
            throw new CustomError.BadRequest("Unsupported category");
        }

        const table = await Table.findOne({
            where: { id: id },
        });
        if (!table) {
            throw new CustomError.NotFound("Table not found");
        }
        const updatedTable = await table.update({
            number,
            price,
            category,
            imageUrl: [imageUrl],
            isAvailable: isAvailable == "true" || isAvailable == true ? true : false,
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Table updated",
            data: {
                table: updatedTable,
            },
        });
    },

    deleteTable: async (req, res) => {
        const { id } = req.params;
        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported id");
        }
        const table = await Table.findOne({
            where: { id: id },
        });
        if (!table) {
            throw new CustomError.NotFound("Table not found");
        }

        try {
            await fs.promises.unlink(
                `uploads/images/table_image/${table.imageUrl}`
            );
            await fs.promises.unlink(
                `uploads/images/table_image/printable/${table.imageUrl}.jpg`
            );
        } catch (err) {
            if (err.code === "ENOENT") {
                console.log("File not found, skipping deletion:", err.path);
            } else {
                console.log("=======: ", err);
                throw new CustomError.NotFound("Can't delete file");
            }
        }

        await table.destroy();
        return res
            .status(StatusCodes.OK)
            .json({ success: true, message: "Table deleted" });
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
        const table = await Table.findOne({
            where: { id: id },
        });
        if (!table) {
            throw new CustomError.NotFound("Table not found");
        }

        table.isAvailable = isAvailable == "true" ? true : false;
        await menu.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Table availability updated",
            data: { table },
        });
    },

    verifyTable: async (req, res) => {
        const { tableId } = req.body;
        if (!tableId) {
            throw new CustomError.BadRequest("Table ID is required");
        }

        if (!isUuidv4(tableId)) {
            throw new CustomError.BadRequest("Unsupported table ID");
        }

        const table = await Table.findOne({
            where: { id: tableId },
        });
        if (!table) {
            throw new CustomError.NotFound("Table not found");
        }

        if (!table.isAvailable) {
            return res.status(StatusCodes.FORBIDDEN).json({
                success: true,
                message: "Table is not available right now",
                data: { isVerified: false },
            });
        }

        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Table verified",
            data: { isVerified: true },
        });
    },
};

export default TableController;
