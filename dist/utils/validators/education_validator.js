"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEducationValidator = exports.createEducationValidator = exports.uploadEducation = void 0;
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const response_1 = __importDefault(require("../response"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/education/");
    },
    filename: (req, file, cb) => {
        const fieldName = file.fieldname.replace("[]", "");
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${fieldName}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
    },
});
// Filter untuk hanya menerima file gambar
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Only JPEG, PNG, and JPG files are allowed"));
    }
};
const uploadEducation = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
exports.uploadEducation = uploadEducation;
const createEducationValidator = [
    (req, res, next) => {
        const { title } = req.body;
        if (!title) {
            return response_1.default.error(res, 400, "Title is required");
        }
        if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
            return response_1.default.error(res, 400, "At least one image is required");
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return response_1.default.error(res, 400, "Validation failed", errors.array());
        }
        next();
    },
];
exports.createEducationValidator = createEducationValidator;
const updateEducationValidator = [
    (0, express_validator_1.body)("title").optional().isString().withMessage("Title must be a string"),
    (0, express_validator_1.body)("imageIdsToDelete")
        .optional()
        .isArray()
        .withMessage("imageIdsToDelete must be an array of image IDs")
        .custom((value) => value.every(Number.isInteger))
        .withMessage("imageIdsToDelete must contain only integers"),
];
exports.updateEducationValidator = updateEducationValidator;
