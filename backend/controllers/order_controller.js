import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import { isUuidv4 } from "../utils/index.js";
import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Table from "../models/table.js";

const OrderController = {
    createOrder: async (req, res) => {
        const { tableId, menus } = req.body;

        if (!tableId) {
            throw CustomError.BadRequest(
                "Please enter your table no to provided"
            );
        }

        if (!isUuidv4(tableId)) {
            throw new CustomError.BadRequest("Unsupported id");
        }

        if (!menus) {
            throw CustomError.BadRequest(
                "No menu item selected, add menu to your cart"
            );
        }

        const table = await Table.findByPk(tableId);

        if (!table) {
            throw CustomError.BadRequest("Selected table doesn't exist");
        }

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Order created successfully",
            data: {
                Order: "Order information",
            },
        });
    },
};

export default OrderController;
