// add JSDoc standard documentation on this file
import multer from "multer";
import fs from "fs";
import path from "path";
import {
    imageFields,
    filePath,
    imageFieldsName,
    allowedImageFileTypes,
    allowedImageExtTypes,
} from "../config/config.js";
import CustomError from "../error/index.js";
import customLog from "../utils/custom_log.js";

const storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        try {
            // if it is image file
            if (imageFields.includes(file.fieldname)) {
                let imagePath = filePath.imagePath;
                if (file.fieldname === imageFieldsName.menuImage) {
                    imagePath += imageFieldsName.menuImage;
                } else if (file.fieldname === imageFieldsName.profileImage) {
                    imagePath += imageFieldsName.profileImage;
                }
                await fs.promises.mkdir(imagePath, { recursive: true });
                cb(null, imagePath);

                // add else if for other file types
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
        cb(null, "temp-" + file.fieldname + "-" + uniqueSuffix);
    },
});

const fileFilter = (req, file, cb) => {
    try {
        // if it is image file
        if (imageFields.includes(file.fieldname)) {
            const mimetype = allowedImageFileTypes.includes(file.mimetype);
            const extname = allowedImageExtTypes.test(
                path.extname(file.originalname?.toLowerCase())
            );
            if (mimetype && extname) {
                return cb(null, true);
            } else {
                throw new CustomError.BadRequest(`Unsupported field type`);
            }
            // add else if for other file types
        } else {
            throw new CustomError.BadRequest(
                `Unknown field name ${file.fieldname}`
            );
        }
    } catch (err) {
        if (err.name === "customError") {
            cb (err, null);
        } else {
            return cb(new Error("Critical: Unknown file filter error", err));
        }
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter,
});

export default upload;
