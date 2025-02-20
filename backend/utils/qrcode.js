/**
 * @module backend/utils/qrcode
 * @file qrcode.js
 * @description QR code utility functions
 * This module provides utility functions for generating QR codes.
 *
 */
import QRcode from "qrcode";
import { Jimp } from "jimp";
import { mkdir } from "fs";
import { BaseURL } from "../config/config.js";

async function QRcodeGenerator(string) {
    try {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        await QRcode.toFile(
            `uploads/images/table_image/table-qr-${uniqueSuffix}`,
            `${BaseURL.replace("5000", "5173")}/${string}`,
            {
                color: {
                    dark: "#000",
                    light: "#fff",
                },
            }
        );

        console.log("QR code saved as ", `table-qr-${uniqueSuffix}`);
        TableMenuImage(
            "utils/Pic_for_Product_QR_Menu.png",
            `uploads/images/table_image/table-qr-${uniqueSuffix}`,
            300,
            260,
            `uploads/images/table_image/printable/table-qr-${uniqueSuffix}.jpg`
        );

        return `table-qr-${uniqueSuffix}`;
    } catch (err) {
        console.error("Error generating QR code:", err);
        return false;
    }
}

export async function TableMenuImage(baseImage, qrImage, x, y, outputImage) {
    const base = await Jimp.read(baseImage);
    const qr = await Jimp.read(qrImage);

    base.composite(qr, x, y); // Overlay QR code at (x, y)
    await base.write(outputImage);
}

mkdir(".uploads/images/table_image/printable", { recursive: true }, (err) => {
    if (err) {
        console.log("File Initialization Failed ========: ", err);
    }
});

// QRcodeGenerator("http://localhost:5173/29401caa-9744-46ea-90c6-393279c0baaf");
// TableMenuImage("Pic_for_Product_QR_Menu.png", "foo.png", 300, 260, "output.jpg");

export default QRcodeGenerator;
