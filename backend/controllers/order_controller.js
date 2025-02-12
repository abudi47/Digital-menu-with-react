import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import { paymentOptions } from "../config/config.js";
import { isUuidv4 } from "../utils/index.js";
import Order from "../models/order.js";
import Menu from "../models/menu.js";
import OrderItem from "../models/order_item.js";
import Payment from "../models/payment.js";
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

        let totalPrice = 0;
        const checkMenus = async () => {
            for (const item of menus || []) {
                console.log(item);
                if (!item?.menu || !isUuidv4(item?.menu)) {
                    throw new CustomError.BadRequest(
                        "The provided menu is not supported"
                    );
                }

                const menu = await Menu.findOne({ where: { id: item.menu } }); // Await here
                if (!menu) {
                    throw new CustomError.BadRequest(
                        "Selected menu doesn't exist"
                    );
                }

                if (!menu.isAvailable) {
                    throw new CustomError.BadRequest(
                        "Selected menu isn't available for now"
                    );
                }
                totalPrice += menu.price;
            }
        };

        // Call the function
        await checkMenus();

        const newOrder = new Order({
            tableId: tableId,
            verificationNumber: Math.floor(1000 + Math.random() * 9000),
        });

        // await newOrder.save();

        // await Promise.all(
        //     menus?.map(async (item) => {
        //         const orderItem = await OrderItem.create({
        //             orderId: newOrder.id,
        //             menuId: item.menu,
        //             quantity: item.quantity,
        //         });
        //     })
        // );

        // const newPayment = await Payment.create({
        //     orderId: newOrder.id,
        //     price: totalPrice,
        //     type: paymentOption,
        //     expiration: Date.now(),
        // });


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
