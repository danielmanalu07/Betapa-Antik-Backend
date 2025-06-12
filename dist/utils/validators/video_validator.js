"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVideoValidator = exports.createVideoValidator = void 0;
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("../response"));
const createVideoValidator = [
    (req, res, next) => {
        const { title, url } = req.body;
        if (!title) {
            return response_1.default.error(res, 400, "Title is Required");
        }
        if (!url) {
            return response_1.default.error(res, 400, "Url is Required");
        }
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return response_1.default.error(res, 400, "validation failed", errors.array());
        }
        next();
    },
];
exports.createVideoValidator = createVideoValidator;
const updateVideoValidator = [
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return response_1.default.error(res, 400, "validation failed", errors.array());
        }
        next();
    },
];
exports.updateVideoValidator = updateVideoValidator;
