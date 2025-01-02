/**
 * @file table_controller.js
 * @module TableController
 * @description Contains the controller functions for table routes
 */
import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import Table from "../models/table.js";

const TableController = {
    async getTables(req, res) {
        let { page = 1, limit = 5 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            throw new CustomError.BadRequest("Invalid pagination values");
        }
        const offset = page * limit - limit;

        const tables = await Table.findAll({
            limit: limit,
            offset: offset,
        });
    },
};

export default TableController;
