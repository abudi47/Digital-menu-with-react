/**
 * Error handler middleware
 *
 */
import { StatusCodes } from "http-status-codes";
import customLog from "../utils/custom_log.js";

/**
 * Error handler middleware
 * only custom errors are included in the response others are logged and marked as internal server error
 *
 */
export default function errorHandler(err, req, res, next) {
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
