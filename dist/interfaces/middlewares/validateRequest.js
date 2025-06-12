"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const response_1 = __importDefault(require("../../utils/response"));
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => ({
            message: err.msg,
        }));
        return response_1.default.error(res, 400, "Validation failed", errorMessages);
    }
    next();
};
exports.default = validateRequest;
