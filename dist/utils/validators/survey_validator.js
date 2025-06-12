"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSurveyValidator = exports.createSurveyValidator = exports.uploadSurvey = void 0;
const express_validator_1 = require("express-validator");
const multer_1 = __importDefault(require("multer"));
const response_1 = __importDefault(require("../response"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/survey/");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
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
const uploadSurvey = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 },
});
exports.uploadSurvey = uploadSurvey;
const createSurveyValidator = [
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return response_1.default.error(res, 400, "Validation failed", errors.array());
        }
        next();
    },
];
exports.createSurveyValidator = createSurveyValidator;
const updateSurveyValidator = [
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return response_1.default.error(res, 400, "Validation failed", errors.array());
        }
        next();
    },
];
exports.updateSurveyValidator = updateSurveyValidator;
