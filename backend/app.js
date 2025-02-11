import "express-async-errors";
import "dotenv/config";
import process from "process";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import customLog from "./utils/custom_log.js";
import db from "./db/db.js";
import redisClient from "./db/redis.js";
import errorHandler from "./middlewares/error_handler.js";

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
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

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
import upload from "./middlewares/file_upload_handler.js";
import { removeFile } from "./utils/file_utils.js";
app.post("/upload", upload.single("menu_image"), async (req, res) => {
    console.log(req.file);
    const retult = await removeFile(
        "uploads/imagesmenu_image/menu_image-1738406186542-164750918"
    );
    if (retult) {
        console.log("File deleted successfully");
    } else {
        console.log("Something went wrong");
    }
    return res.status(200).send("File uploded sucessfully");
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

    app.listen(5000, () => {
        customLog.success("Server is running on port 5000.");
    });
}

main();
