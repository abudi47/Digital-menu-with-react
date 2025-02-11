import { StatusCodes } from "http-status-codes";
import { paymentOptions } from "../config/config.js";

const PaymentController = {
    paymentMethods: async (req, res) => {
        return res
            .status(StatusCodes.OK)
            .json({ success: true, data: { paymentOptions: paymentOptions } });
    },
};

export default PaymentController;
