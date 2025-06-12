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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepositoryImpl = void 0;
const prisma_1 = require("../../config/prisma");
class AuthRepositoryImpl {
    getAllUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma_1.prisma.user.findMany({
                where: {
                    NOT: {
                        role: "ADMIN",
                    },
                },
            });
            return users;
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdate = yield prisma_1.prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    status: status,
                },
            });
            return userUpdate;
        });
    }
    updateUser(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield prisma_1.prisma.user.update({
                where: {
                    id: userId,
                },
                data,
            });
            return updated;
        });
    }
    findUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield prisma_1.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });
            return foundUser;
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield prisma_1.prisma.user.findUnique({
                where: {
                    username: username,
                },
            }));
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userCrated = yield prisma_1.prisma.user.create({
                data: user,
            });
            return userCrated;
        });
    }
    blaclistToken(token, expiredAt) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.blacklistedToken.create({
                data: {
                    token,
                    expiredAt,
                },
            });
        });
    }
    isTokenBlacklisted(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const blackListed = yield prisma_1.prisma.blacklistedToken.findUnique({
                where: {
                    token: token,
                },
            });
            return !!blackListed;
        });
    }
}
exports.AuthRepositoryImpl = AuthRepositoryImpl;
