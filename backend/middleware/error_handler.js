import { StatusCodes } from "http-status-codes";
import customLog from "../utils/custom_log.js";


const errorHandler = (err, req, res, next) => {
    const error = {
        message: "Internal server error",
        status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    };

    if (err?.name === "customError") {
        error.message = err.message;
    } else {
        // Critical error
        customLog.warning(err);
    }

    return res
        .status(error.status)
        .json({ success: false, error: error.message });
};

export default errorHandler;
