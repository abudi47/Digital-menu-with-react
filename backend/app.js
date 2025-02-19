import "express-async-errors";
import "dotenv/config";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import customLog from "./utils/custom_log.js";
import db from "./db/db.js";
import redisClient from "./db/redis.js";
import errorHandler from "./middlewares/error_handler.js";
import { BaseURL } from "./config/config.js";
import SocketAuthHandler from "./middlewares/socket/socket_auth_handler.js";

import {
    MenuRoute,
    AuthRoute,
    UserRoute,
    TableRoute,
    OrderRoute,
    ImageRoute,
    PaymentRoute,
} from "./routes/index.js";

const app = express();
/** 
 * configure the server to use the socket.io
**/
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Allow your React frontend
        methods: ["GET", "POST"],
        credentials: true,
    },
    allowEIO3: true,
});
io.use(SocketAuthHandler);

app.use(
    cors({
        // origin: "http://localhost:5173",
        origin: `${BaseURL.replace("5000", "5173")}`,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// for all v1 api routes
const APIVersion1 = express.Router();
app.use("/api/v1", APIVersion1);
APIVersion1.use("/images", ImageRoute);
APIVersion1.use("/auth", AuthRoute);
APIVersion1.use("/user", UserRoute);
APIVersion1.use("/menu", MenuRoute);
APIVersion1.use("/order", OrderRoute);
APIVersion1.use("/table", TableRoute);
APIVersion1.use("/payment", PaymentRoute);

// ======================== test code
app.get("/test", async (req, res) => {
    io.emit("newRecord", "walla it's working fine");
    res.send("done");
});
// ======================== test code end here

app.use(errorHandler);
app.use("*", async (req, res) => {
    return res
        .status(404)
        .json({ success: false, error: "Page doesn't exist" });
});

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

    server.listen(5000, () => {
        customLog.success("Server is running on port 5000.");
    });
}

main();
