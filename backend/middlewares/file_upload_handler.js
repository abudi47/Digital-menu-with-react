import multer from "multer";
import fs from "fs";
import path from "path";
import {
    imageFields,
    filePath,
    allowedImageFileTypes,
} from "../config/config.js";
import CustomError from "../error/index.js";
import customLog from "../utils/custom_log.js";

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        customLog.warning("=========== File Controller", file);

        try {
            if (imageFields.includes(file.fieldname)) {
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
        if (imageFields.includes(file.fieldname)) {
            const mimetype = allowedImageFileTypes.test(file.mimetype);
            const extname = allowedImageFileTypes.test(
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
