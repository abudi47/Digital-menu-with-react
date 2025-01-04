/**
 * @file not_found.js is a file that contains the NotFound class.
 * This class is a custom error class that extends the CustomError class.
 * It is used to throw a custom error when resource is not found.
 * The status code is set to 404.
 */
import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

export default class NotFound extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.NotFound;
    }
}
