/**
 * Restaurant Model
 *
 * This model represents a restaurant in the database.
 * It includes fields for the restaurant's ID, name, and location.
 *
 * @module models/restaurant
 */
import { DataTypes } from "sequelize";
import db from "../db/db.js";

/**
 * Defines the Restaurant model
 *
 * @typedef {Object} Restaurant
 * @property {UUIDV4} id - The unique identifier for the restaurant
 * @property {string} name - The name of the restaurant
 * @property {string} location - The location of the restaurant
 * @property {string} email - The email address of the restaurant
 * @property {string} phone - The phone number of the restaurant
 * @property {string} image_url - The URL of the restaurant's image
 * @property {string} description - A description of the restaurant
 *
 * @type {Model}
 */
const Restaurant = db.define("restaurant", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    phone: {
        type: DataTypes.STRING(13),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    description: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
});

export default Restaurant;
