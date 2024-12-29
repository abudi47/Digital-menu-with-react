/**
 * Payment Model
 * This model represents a payment in the database.
 * 
 * @module models/payment
 */
import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Order from "./order.js";

/**
 * Defines the Payment model
 * @typedef {Object} Payment
 * @property {UUIDV4} id - The unique identifier for the payment
 * @property {UUIDV4} orderId - The unique identifier for the order
 * @property {number} price - The price of the payment
 * @property {string} type - The type of the payment
 * @property {Date} expiration - The expiration date of the payment
 * @property {string} status - The status of the payment
 * 
 * @type {Model}
 */
const Payment = db.define("payment", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
    },
    type: {
        type: DataTypes.ENUM("telebirr", "cbe", "chapa"),
        allowNull: false,
        defaultValue: "telebirr",
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "conformed", "expired"),
        allowNull: false,
        defaultValue: "pending",
    },
});

Order.hasOne(Payment, {
    foreignKey: "orderId",
    as: "order",
});

export default Payment;
