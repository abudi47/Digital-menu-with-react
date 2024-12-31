import { StatusCodes } from "http-status-codes";
import CustomError from "./custom_error.js";

export default class BadRequest extends CustomError {
    constructor(message) {
        super(message);
        this.status = StatusCodes.BAD_REQUEST;
    }
}
