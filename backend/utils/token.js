/**
 * @module backend/utils/token
 * @file token.js
 * @description Token utility functions
 * This module provides utility functions for generating tokens.
 */
import crypto from "crypto";

export default async function generateToken() {
    return new Promise((resolve, reject) => {
        try {
            const token = crypto.randomBytes(16).toString("hex");
            resolve(token);
        } catch (error) {
            reject(error);
        }
    });
}
