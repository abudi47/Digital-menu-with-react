import "express-async-errors";
import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import customLog from "./utils/custom_log.js";
import db from "./db/db.js";
import redisClient from "./db/redis.js";
import errorHandler from "./middlewares/error_handler.js";

import { MenuRoute, AuthRoute, UserRoute } from "./routes/index.js";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// for all v1 api routes
const APIVersion1 = express.Router();
app.use("/api/v1", APIVersion1);
APIVersion1.use("/menu", MenuRoute);
APIVersion1.use("/auth", AuthRoute);
APIVersion1.use("/user", UserRoute);

app.use(errorHandler);
app.use("*", async (req, res) => {
  return res.status(404).json({ success: false, error: "Page doesn't exist" });
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
