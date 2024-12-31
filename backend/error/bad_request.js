/**
 * @file bad_request.js is a file that contains the BadRequest class.
 * This class is a custom error class that extends the CustomError class.
 * It is used to throw a custom error when a bad request is made.
 * The status code is set to 400.
 */

import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

export default class BadRequest extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}
