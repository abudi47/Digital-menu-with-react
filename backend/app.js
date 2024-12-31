import "express-async-errors";
import "dotenv/config";
import express from "express";
import customLog from "./utils/custom_log.js";
import db from "./db/db.js";
import redisClient from "./db/redis.js";
import errorHandler from "./middlewares/error_handler.js";

// Routes
import MenuRoute from "./routes/menu_routes.js";

const app = express();
// middlewares for security and parsing


// for all v1 api routes
const APIVersion1 = express.Router();
app.use("/api/v1", APIVersion1);
APIVersion1.use("/menu", MenuRoute);


app.use(errorHandler);
app.use("*", async (req, res) => {
    return res
        .status(404)
        .json({ success: false, error: "Page doesn't exist" });
});





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
