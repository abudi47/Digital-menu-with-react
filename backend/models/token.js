/**
 * User Model
 * This model represents a user in the database.
 *
 * @module models/user
 */

import { DataTypes } from "sequelize";
import db from "../db/db.js";
import User from "./user.js";

const Token = db.define("token", {
    id: {
        type: DataTypes.UUIDV4,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    token: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUIDV4,
        allowNull: false,
    },
 
});

User.hasMany(Token, {
    foreignKey: "userID",
    as: "user"

})

export default Token;