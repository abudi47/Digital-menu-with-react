/**
 * User Model
 * This model represents a user in the database.
 *
 * @module models/user
 */
import { DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import db from "../db/db.js";

/**
 * Defines the User model
 * @typedef {Object} user
 * @property {UUIDV4} id - The unique identifier for the user
 * @property {string} firstName - The first name of the user
 * @property {string} lastName - The last name of the user
 * @property {string} email - The email address of the user
 * @property {string} phone - The phone number of the user
 * @property {string} password - The password of the user
 * @property {string} role - The role of the user
 * @property {string} imageUrl - The URL of the user's image
 *
 * @type {Model}
 */
const User = db.define("user", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    lastName: {
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
        unique: true,
    },
    password: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("admin", "casher", "food_runner", "barista"),
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
});

User.prototype.isPasswordCorrect = async function (password) {
    return password === this.password;
};

// salt the password before it' saved
User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(5);
    user.password = await bcrypt.hash(user.password, salt);
});

export default User;
