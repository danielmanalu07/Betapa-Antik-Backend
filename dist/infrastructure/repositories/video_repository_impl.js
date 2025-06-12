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
exports.VideoRepositoryImpl = void 0;
const prisma_1 = require("../../config/prisma");
class VideoRepositoryImpl {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.video.findMany();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const video = yield prisma_1.prisma.video.findUnique({
                where: { id: id },
            });
            return video;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield prisma_1.prisma.video.create({
                data: {
                    title: data.title,
                    url: data.url,
                },
            });
            return created;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield prisma_1.prisma.video.update({
                where: {
                    id: id,
                },
                data: {
                    title: data.title,
                    url: data.url,
                },
            });
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.video.delete({
                where: {
                    id: id,
                },
            });
        });
    }
}
exports.VideoRepositoryImpl = VideoRepositoryImpl;
exports.default = VideoRepositoryImpl;
