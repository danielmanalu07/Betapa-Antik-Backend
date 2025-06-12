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
const hash_1 = require("../utils/hash");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = require("../utils/HttpError");
class AuthUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    register(username, password, name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashed = yield (0, hash_1.hashPassword)(password);
            return yield this.repo.createUser({
                username,
                password: hashed,
                name,
                email,
            });
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repo.findByUsername(username);
            if (!user)
                throw new HttpError_1.HttpError("User not found", 404);
            const matched = yield (0, hash_1.comparePassword)(password, user.password);
            if (!matched)
                throw new HttpError_1.HttpError("Invalid password", 400);
            const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
            return { token, user };
        });
    }
    logout(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const decoded = jsonwebtoken_1.default.decode(token);
            const expiredAt = new Date(decoded.exp * 1000);
            yield this.repo.blaclistToken(token, expiredAt);
        });
    }
    isTokenBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.isTokenBlacklisted(token);
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repo.findUser(userId);
            if (!user)
                throw new HttpError_1.HttpError("User not found", 404);
            return user;
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repo.findUser(userId);
            if (!user)
                throw new HttpError_1.HttpError("User not found", 404);
            const updated = yield this.repo.updateUser(userId, data);
            if (!updated)
                throw new HttpError_1.HttpError("Updated failed", 400);
            return updated;
        });
    }
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.repo.getAllUser();
            return users;
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.repo.findUser(id);
            if (!user)
                throw new HttpError_1.HttpError("User not found", 404);
            const updated = yield this.repo.updateStatus(id, status);
            if (!updated)
                throw new HttpError_1.HttpError("Updated failed", 400);
            return updated;
        });
    }
}
exports.default = AuthUseCase;
