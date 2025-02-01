import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Table from "../models/table.js";

const OrderController = {
    createOrder: async (req, res) => {
        const { tableId, menus } = req.body;

        if (!tableId) {
            throw CustomError.BadRequest(
                "Please enter your table no to procced"
            );
        }

        if (!menus) {
            throw CustomError.BadRequest(
                "No menu item selected, add menu to your cart"
            );
        }

        res.status(StatusCodes.OK).json({
            sucess: true,
            message: "Order created successfully",
            data: {
                Order: "order information"
            },
        });
    },
};

export default OrderController;
