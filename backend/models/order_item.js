/**
 * OrderItem Model
 * This model represents an order item in the database.
 * 
 * @module models/order_item
 */
import { DataTypes } from "sequelize";
import db from "../db/db.js";
import Order from "./order.js";
import Menu from "./menu.js";

/**
 * Defines the OrderItem model
 * @typedef {Object} OrderItem
 * @property {UUIDV4} id - The unique identifier for the order item
 * @property {UUIDV4} orderId - The unique identifier for the order
 * @property {UUIDV4} menuId - The unique identifier for the menu
 * @property {number} quantity - The quantity of the menu
 * 
 * @type {Model}
 */
const OrderItem = db.define("order_item", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    orderId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    menuId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
});

Order.hasMany(OrderItem, {
    foreignKey: "orderId",
    as: "orderItems",
});

OrderItem.belongsTo(Order, {
    foreignKey: "orderId",
    as: "order",
});

Menu.hasMany(OrderItem, {
    foreignKey: "menuId",
    as: "orderItems",
});

OrderItem.belongsTo(Menu, {
    foreignKey: "menuId",
    as: "menu",
});

export default OrderItem;
