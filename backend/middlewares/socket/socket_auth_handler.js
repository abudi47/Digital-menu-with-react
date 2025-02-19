/**
 * @file socket_auth_handler.js
 * @module authHandler
 * @description Contains the middleware function for authenticating socket
 */
import cookie from "cookie";
import CustomError from "../../error/index.js";
import redisClient from "../../db/redis.js";

export default async function SocketAuthHandler(socket, next) {
    const token = cookie.parse(socket.handshake.headers.cookie)?.token;
    if (!token) {
        next(new CustomError.UnauthorizedRequest("Unauthorized"));
    }

    const user = await redisClient.get(token || "");

    if (!user) {
        next(new CustomError.UnauthorizedRequest("Unauthorized"));
    }

    socket.user = JSON.parse(user);
    next();
}
