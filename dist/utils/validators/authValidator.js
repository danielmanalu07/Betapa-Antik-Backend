"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = exports.loginValidator = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const registerValidator = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("name").notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").notEmpty().withMessage("email is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
    (0, express_validator_1.body)("confirmation_password")
        .notEmpty()
        .withMessage("confirmation password is required")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("passwords do not match");
        }
        return true;
    }),
];
exports.registerValidator = registerValidator;
const loginValidator = [
    (0, express_validator_1.body)("username").notEmpty().withMessage("Username is required"),
    (0, express_validator_1.body)("password").notEmpty().withMessage("password is required"),
];
exports.loginValidator = loginValidator;
const updateUserValidator = [
    (0, express_validator_1.body)("username").optional().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("name").optional().notEmpty().withMessage("name is required"),
    (0, express_validator_1.body)("email").optional().notEmpty().withMessage("email is required"),
];
exports.updateUserValidator = updateUserValidator;
