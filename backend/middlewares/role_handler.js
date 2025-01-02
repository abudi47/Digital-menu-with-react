/**
 * @file role_handler.js
 * @module roleHandler
 * @description Contains the middleware function for role-based access control
 */

import { StatusCodes } from "http-status-codes";

export default function roleHandler(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res
                .status(StatusCodes.FORBIDDEN)
                .json({ success: false, error: "Forbidden" });
        }
        next();
    };
}
