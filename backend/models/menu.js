/**
 * Menu Model
 * This model represents a menu in the database.
 * 
 * @module models/menu
 */
import { DataTypes } from "sequelize";
import db from "../db/db.js";

/**
 * Defines the Menu model
 * @typedef {Object} Menu
 * @property {UUIDV4} id - The unique identifier for the menu
 * @property {string} name - The name of the menu
 * @property {string} description - The description of the menu
 * @property {number} price - The price of the menu
 * @property {string} category - The category of the menu
 * @property {string} imageUrl - The URL of the menu's image
 * @property {boolean} isAvailable - The availability of the menu
 * 
 * @type {Model}
 */
const Menu = db.define("menu", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(200),
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
    },
    category: {
        type: DataTypes.ENUM("starter", "soft_drink", "unknown"),
        allowNull: false,
        defaultValue: "unknown",
    },
    imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        // JSON.stringify() and JSON.parse() are used to store an array of image URLs
        get() {
            return JSON.parse(this.getDataValue("imageUrl"));
        },
        set(value) {
            this.setDataValue("imageUrl", JSON.stringify(value));
        },
    },
    isAvailable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

export default Menu;
