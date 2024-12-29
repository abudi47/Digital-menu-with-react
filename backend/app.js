import 'express-async-errors';
import "dotenv/config";
import express from "express";
import customLog from "./utils/custom_log.js";
import db from "./db/db.js";
import redisClient from "./db/redis.js";

const app = express();

// test import
import User from "./models/user.js";
import Order from "./models/order.js";
import Restaurant from "./models/restaurant.js";

async function main() {
    try {
        await db.authenticate({ logging: false });
        customLog.success("Connected to DB server.");
        await db.sync({ logging: false }).then(() => {
            customLog.success("Database synchronization competed.");
        });
    } catch (err) {
        customLog.error("Unable to connect to the database.", error);
    }
    await redisClient.connect();    

    app.listen(5000, () => {
        customLog.success("Server is running on port 5000.");
    });
}

main();
