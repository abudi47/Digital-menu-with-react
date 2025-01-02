/**
 * @module backend/utils/qrcode
 * @file qrcode.js
 * @description QR code utility functions
 * This module provides utility functions for generating QR codes.
 * 
 */
import QRcode from "qrcode";

async function QRcodeGenerator(string) {
    try {
        await QRcode.toFile("foo.png", string, {
            color: {
                dark: "#000",
                light: "#fff",
            },
        });

        console.log("QR code saved as foo.png");
        return true;
    } catch (err) {
        console.error("Error generating QR code:", err);
        return false;
    }
}

export default QRcodeGenerator;
