/**
 * Order Model
 * This model represents an order in the database.
 *
 * @module models/order
 */

import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Table from "./table.js";

/**
 * Defines the Order model
 * @typedef {Object} Order
 * @property {UUIDV4} id - The unique identifier for the order
 * @property {UUIDV4} tableId - The unique identifier for the table
 * @property {string} status - The status of the order
 * @property {number} verificationNumber - The verification number of the order
 *
 * @type {Model}
 */
const Order = db.define("order", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    tableId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("pending", "served", "canceled"),
        allowNull: false,
        defaultValue: "pending",
    },
    verificationNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

Table.hasMany(Order, {
    foreignKey: "tableId",
    as: "orders",
});
Order.belongsTo(Table, {
    foreignKey: "tableId",
    as: "table",
});

export default Order;
