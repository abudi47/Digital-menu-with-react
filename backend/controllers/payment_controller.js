import { StatusCodes } from "http-status-codes";
import Payment from "../models/payment.js";
import Order from "../models/order.js";
import OrderItem from "../models/order_item.js";
import Menu from "../models/menu.js";
import Table from "../models/table.js";
import CustomError from "../error/index.js";
import { paymentOptions } from "../config/config.js";
import { verifyChapaPayment } from "../utils/payment.js";
import { isUuidv4 } from "../utils/utils.js";
import { io } from "../app.js";

const PaymentController = {
    paymentMethods: async (req, res) => {
        return res
            .status(StatusCodes.OK)
            .json({ success: true, data: { paymentOptions: paymentOptions } });
    },

    chapaCallback: async (req, res) => {
        const { id } = req.params;

        if (!isUuidv4(id)) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, error: "Invalid payment id" });
        }

        const paymentRecord = await Payment.findOne({
            where: { id: id },
        });

        if (!paymentRecord) {
            throw CustomError.NotFound("Payment not found");
        }

        if (paymentRecord.status === "confirmed") {
            return res.status(StatusCodes.OK).json({
                success: true,
                data: { message: "Payment already paid" },
            });
        }

        // verify payment
        const payment = await verifyChapaPayment(id);

        console.log("payment", payment);

        if (!payment) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, error: "Payment not found" });
        }

        if (payment.status !== "success") {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, error: "Payment not successful" });
        }

        if (payment.data?.amount !== paymentRecord.price) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, error: "Invalid payment amount" });
        }

        if (payment.data?.tx_ref !== id) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ success: false, error: "Invalid payment id" });
        }

        // update payment status
        paymentRecord.status = "confirmed";
        await paymentRecord.save();

        const orderRecord = await Order.findOne({
            where: { id: paymentRecord.orderId },
            include: [
                {
                    model: OrderItem,
                    as: "orderItems",
                    include: [{ model: Menu, as: "menu" }],
                },
                { model: Table, as: "table" },
            ],
        });
        const jsonOrderRecord = orderRecord?.toJSON();

        console.log(
            "============================================ payment Confirmed"
        );
        io.emit("newOrder", { order: { ...jsonOrderRecord, payment: payment } });

        return res.status(StatusCodes.OK).send();
    },
};

export default PaymentController;
