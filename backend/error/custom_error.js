/**
 * @file custom_error.js is a file that contains the CustomError class.
 * This class is a custom error class that extends the Error class.
 * It is used to throw a custom error when a custom error is made.
 * The name is set to "customError".
 */
export default class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "customError";
    }
}
