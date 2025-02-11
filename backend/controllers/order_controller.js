import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import { paymentOptions } from "../config/config.js";
import { isUuidv4 } from "../utils/index.js";
import Order from "../models/order.js";
import Menu from "../models/menu.js";
import OrderItem from "../models/order_item.js";
import Table from "../models/table.js";

const OrderController = {
    createOrder: async (req, res) => {
        const { tableId, menus, paymentOption } = req.body;

        if (!tableId) {
            throw CustomError.BadRequest(
                "Please enter your table no to provided"
            );
        }

        if (!isUuidv4(tableId)) {
            throw new CustomError.BadRequest(
                "Unsupported table id scan table QR code"
            );
        }

        if (!menus) {
            throw CustomError.BadRequest(
                "No menu item selected, add menu to your cart"
            );
        }

        if (!typeof menus === "object") {
            throw new CustomError.BadRequest(
                "Unsupported menu items try again"
            );
        }

        const isPaymentSupported = paymentOptions.filter((option) => {
            paymentOption === option.id && option.isActive;
        });

        if (!isPaymentSupported) {
            throw new CustomError.BadRequest(
                "Unsupported Payment method try the other one"
            );
        }

        const isTableExist = await Table.findOne({ where: { id: tableId } });

        if (!isTableExist) {
            throw new CustomError.BadRequest(
                "Table not found try to scan table QR code again"
            );
        }

        if (!isTableExist.isAvailable) {
            throw new CustomError.BadRequest(
                "This table is not available for now try the other one"
            );
        }

        const isAllValid = menus?.map((item) => {
            console.log(item);
            if (!item?.menu || !isUuidv4(item?.menu)) {
                throw new CustomError.BadRequest(
                    
                );
            }
            const menu = Menu.findOne({ where: { id: item.menu } });
            if (!menu) {
                throw new CustomError.BadRequest("Selected menu doesn't exist");
            }

            if (!menu.isAvailable) {
                throw new CustomError.BadRequest(
                    "Selected menu doesn't available for now"
                );
            }
        });

        console.log(tableId, menus, paymentOption);

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
