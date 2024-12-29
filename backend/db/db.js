/**
 * @api {module} /db/db DB
 * @apiGroup Models
 * @apiDescription This module is responsible for creating a connection to the database.
 * @apiVersion 0.1.0
 */
import { Sequelize } from "sequelize";
import process from "process";
import { dbConfig } from "../config/config.js";
import customLog from "../utils/custom_log.js";

const env = process.env.NODE_ENV;
const config = dbConfig[env];

const db = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: env === "production" ? false : customLog.query,
});

export default db;
