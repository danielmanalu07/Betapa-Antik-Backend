"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.getAllUser = exports.updateUser = exports.findUser = exports.logout = exports.login = exports.register = void 0;
const response_1 = __importDefault(require("../../utils/response"));
const authService_1 = __importDefault(require("../../infrastructure/services/authService"));
const errorHandler_1 = __importDefault(require("../../utils/errorHandler"));
const HttpError_1 = require("../../utils/HttpError");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, name, email, confirmation_password } = req.body;
        const user = yield authService_1.default.register(username, password, name, email);
        return response_1.default.success(res, 201, "User created successfully", user);
    }
    catch (error) {
        const { statusCode, message, error: errData } = (0, errorHandler_1.default)(error);
        return response_1.default.error(res, statusCode, message, errData);
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const { token, user } = yield authService_1.default.login(username, password);
        yield authService_1.default.isTokenBlacklisted(token);
        return response_1.default.success(res, 200, "Login successful", {
            user,
            token,
        });
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        if (!token)
            return response_1.default.error(res, 401, "Unauthorized", "Token not provided");
        yield authService_1.default.logout(token);
        return response_1.default.success(res, 200, "Logout successful");
    }
    catch (error) {
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.logout = logout;
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const user = yield authService_1.default.findUser(userId);
        return response_1.default.success(res, 200, "User found", user);
    }
    catch (error) {
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.findUser = findUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { username, name, email } = req.body;
        const data = { username, name, email };
        const updatedUser = yield authService_1.default.updateUser(userId, data);
        return response_1.default.success(res, 200, "User updated", updatedUser);
    }
    catch (error) {
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateUser = updateUser;
const getAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield authService_1.default.getAllUser();
        return response_1.default.success(res, 200, "Get User Successfully", users);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllUser = getAllUser;
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { status } = req.body;
        const result = yield authService_1.default.updateStatus(id, status);
        return response_1.default.success(res, 200, "Update Status Successfully", result);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateStatus = updateStatus;
