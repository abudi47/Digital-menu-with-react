import { unlink } from "node:fs/promises";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { imageResolutions } from "../config/config.js";

export const removeFile = async (path) => {
    return unlink(path)
        .then(() => {
            return true;
        })
        .catch(() => {
            return false;
        });
};

export const multiResolution = async (file) => {
    try {
        const imageBuffer = fs.readFileSync(file.path);

        for (const width of imageResolutions) {
            const outputPath = path.join(
                file.destination,
                `/${file.filename?.split("temp-")[1]}_${width}`
            );

            await sharp(imageBuffer)
                .resize({ width })
                .toFormat("jpeg")
                .toFile(outputPath);
            console.log(`Thumbnail created: ${outputPath}`);
        }
    } catch (err) {
        console.error(`Error processing image: ${file.path}`, err);
    }
};
