import { StatusCodes } from "http-status-codes";
import CustomError from "../error/index.js";
import { paymentOptions } from "../config/config.js";
import { isUuidv4 } from "../utils/index.js";
import Order from "../models/order.js";
import Menu from "../models/menu.js";
import OrderItem from "../models/order_item.js";
import Payment from "../models/payment.js";
import Table from "../models/table.js";
import { initializeChapaPayment } from "../utils/payment.js";

const OrderController = {
    createOrder: async (req, res) => {
        const { tableId, menus, paymentOption } = req.body;

        if (!tableId) {
            throw new CustomError.BadRequest(
                "Please enter your table no to provided"
            );
        }

        if (!isUuidv4(tableId)) {
            throw new CustomError.BadRequest(
                "Unsupported table id scan table QR code"
            );
        }

        if (!menus) {
            throw new CustomError.BadRequest(
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

        totalPrice += isTableExist.price;

        const newOrder = new Order({
            tableId: tableId,
            verificationNumber: Math.floor(1000 + Math.random() * 9000),
        });

        const newPayment = new Payment({
            orderId: newOrder.id,
            price: totalPrice,
            type: paymentOption,
            expiration: Date.now(),
        });

        let payment;
        if (paymentOption === "chapa") {
            payment = await initializeChapaPayment({
                price: totalPrice,
                // user: req.user,
                paymentId: newPayment.id,
                tableId: tableId,
            });

            if (!payment || !payment.success === "success") {
                throw new CustomError.BadRequest(
                    "Payment initialization failed try again"
                );
            }

            newPayment.checkOutUrl = payment.data.checkout_url;
        } else {
            throw new CustomError.BadRequest("Unsupported payment method");
        }

        // to make sure all validation passed we save the order ofter payment request is successful
        await newOrder.save();

        // create and save all order items
        await Promise.all(
            menus?.map(async (item) => {
                const orderItem = await OrderItem.create({
                    orderId: newOrder.id,
                    menuId: item.menu,
                    quantity: item.quantity,
                });
            })
        );

        await newPayment.save();

        res.status(StatusCodes.OK).json({
            success: true,
            message: "Order created successfully",
            data: {
                order: newOrder,
                checkout_url: newPayment.checkOutUrl,
            },
        });
    },

    getOrder: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            throw new CustomError.BadRequest("Unsupported order id");
        }

        // order by createdAt desc newest first
        const order = await Order.findOne({
            where: { id: id },
            include: [
                {
                    model: OrderItem,
                    include: [
                        {
                            model: Menu,
                        },
                    ],
                },
            ],
            order: [["createdAt", "DESC"]],
        });

        if (!order) {
            throw new CustomError.BadRequest("Order not found");
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: { order },
        });
    },

    getOrders: async (req, res) => {
        let { page = 1, limit = 20, query = "", category = "" } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        console.log(
            "Order fetch ================",
            `limit ${limit}, page ${page}, query ${query} category ${category}`
        );

        if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
            throw new CustomError.BadRequest("Invalid pagination values");
        }
        const offset = page * limit - limit;

        const orders = await Order.findAll({
            where: {},
            order: [["createdAt", "DESC"]],
            limit: limit || 10,
            offset: offset || 0,
            subQuery: false,
        });

        if (!orders) {
            res.status(StatusCodes.NotFound).json({
                success: false,
                message: "Order not created yet",
                data: { orders },
            });
        }

        res.status(StatusCodes.OK).json({
            success: true,
            data: { orders },
        });
    },
};

export default OrderController;
