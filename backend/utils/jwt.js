/**
 * @module backend/utils/jwt
 * @file jwt.js
 * @description JWT utility functions
 * This module provides utility functions for JSON Web Tokens.
 * 
 */
import jwt from "jsonwebtoken";

export default function signUser(user) {
    return jwt.sign(
        { ...user },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
}
