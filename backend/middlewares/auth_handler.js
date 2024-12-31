/**
 * @file auth_handler.js
 * @module authHandler
 * @description Contains the middleware function for authenticating users
 */

import { StatusCodes } from "http-status-codes";
import redisClient from "../db/redis.js";

export default async function authHandler(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ success: false, error: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];
    const user = await redisClient.get(token);
    if (!user) {
        return res
            .status(StatusCodes.UNAUTHORIZED)
            .json({ success: false, error: "Unauthorized" });
    }
    req.user = JSON.parse(user);
    next();
}
