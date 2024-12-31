/**
 * @file unauthorized_request.js
 * @description Custom error class for unauthorized request
 */

import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

export default class UnauthorizedRequest extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}
