import multer from "multer";
import fs from "fs";
import path from "path";
import { filePath } from "../config/config.js";
import CustomError from "../error/index.js";
import customLog from "../utils/custom_log.js";
import { config } from "process";

const image_fields = ["menu_image", "profile_image"];

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        customLog.warning("=========== File Controller", file);

        try {
            if (image_fields.includes(file.fieldname)) {
                await fs.promises.mkdir(filePath.qrPath, { recursive: true });
            } else {
                throw new CustomError.BadRequest(
                    `Unknown field name ${file.fieldname}`
                );
            }
        } catch (err) {
            cb(err, null);
        }
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    try {
        if (image_fields.includes(file.fieldname)) {
            const mimetype = config.allowedImageFileTypes.test(file.mimetype);
            const extname = config.allowedImageFileTypes.test(
                path.extname(file.originalname?.toLowerCase())
            );
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                throw new CustomError.BadRequest(`Unsupported field type`);
            }
        } else {
            throw new CustomError.BadRequest(
                `Unknown field name ${file.fieldname}`
            );
        }
    } catch (err) {
        return cb(new Error("Critical: Unknown file filter error", err));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
});

export default upload;
