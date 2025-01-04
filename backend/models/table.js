/**
 * Table Model
 * This model represents a table in the database.
 *
 * @module models/table
 */
import { DataTypes } from "sequelize";
import db from "../db/db.js";
import { tableCategories } from "../config/config.js";

/**
 * Defines the Table model
 * @typedef {Object} Table
 * @property {UUIDV4} id - The unique identifier for the table
 * @property {number} number - The number of the table
 * @property {number} price - The price of the table
 * @property {string} category - The category of the table
 * @property {string} imageUrl - The URL of the table's image
 * @property {boolean} isAvailable - The availability of the table
 *
 * @type {Model}
 */
const Table = db.define("table", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    category: {
        type: DataTypes.ENUM(...tableCategories),
        allowNull: false,
        defaultValue: "normal",
    },
    imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

export default Table;
