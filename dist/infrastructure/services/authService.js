"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authUseCase_1 = __importDefault(require("../../usecases/authUseCase"));
const authRepositoryImpl_1 = require("../repositories/authRepositoryImpl");
const repo = new authRepositoryImpl_1.AuthRepositoryImpl();
const authService = new authUseCase_1.default(repo);
exports.default = authService;
