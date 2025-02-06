/**
 * @module backend/utils/qrcode
 * @file qrcode.js
 * @description QR code utility functions
 * This module provides utility functions for generating QR codes.
 *
 */
import QRcode from "qrcode";
import { Jimp } from "jimp";

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

export async function TableMenuImage(baseImage, qrImage, x, y, outputImage) {
    const base = await Jimp.read(baseImage);
    const qr = await Jimp.read(qrImage);

    base.composite(qr, x, y); // Overlay QR code at (x, y)
    await base.write(outputImage)
}

TableMenuImage("Pic_for_Product_QR_Menu.png", "foo.png", 300, 260, "output.jpg");

export default QRcodeGenerator;
