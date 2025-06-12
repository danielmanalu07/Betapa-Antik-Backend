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
exports.MosquitoRepositoryImpl = void 0;
const prisma_1 = require("../../config/prisma");
class MosquitoRepositoryImpl {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const mosquitos = yield prisma_1.prisma.mosquito.findMany({
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            const mapped = mosquitos.map((mosquito) => {
                var _a;
                return (Object.assign(Object.assign({}, mosquito), { images: ((_a = mosquito.images) === null || _a === void 0 ? void 0 : _a.map((img) => img.image)) || [] }));
            });
            return mapped;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mosquito = yield prisma_1.prisma.mosquito.findUnique({
                where: {
                    id: id,
                },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            if (!mosquito)
                return null;
            const mapped = Object.assign(Object.assign({}, mosquito), { images: mosquito.images.map((img) => img.image) || [] });
            return mapped;
        });
    }
    create(data, imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const mosquito = yield prisma_1.prisma.mosquito.create({
                data: {
                    title: data.title,
                },
            });
            const createdImages = yield prisma_1.prisma.image.createMany({
                data: imagePaths.map((path) => ({
                    imagePath: path,
                })),
            });
            const images = yield prisma_1.prisma.image.findMany({
                where: {
                    imagePath: {
                        in: imagePaths,
                    },
                },
            });
            yield prisma_1.prisma.mosquitoImage.createMany({
                data: images.map((img) => ({
                    mosquitoId: mosquito.id,
                    imageId: img.id,
                })),
            });
            const result = yield prisma_1.prisma.mosquito.findUnique({
                where: { id: mosquito.id },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            const mapped = Object.assign(Object.assign({}, result), { images: result === null || result === void 0 ? void 0 : result.images.map((img) => img.image) });
            return mapped;
        });
    }
    update(id, data, newImages, imageIdsToUnlink) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateMosquito = yield prisma_1.prisma.mosquito.update({
                where: { id: id },
                data: {
                    title: data.title,
                },
            });
            if (imageIdsToUnlink && imageIdsToUnlink.length > 0) {
                yield prisma_1.prisma.mosquitoImage.deleteMany({
                    where: {
                        mosquitoId: id,
                        imageId: { in: imageIdsToUnlink },
                    },
                });
            }
            if (newImages && newImages.length > 0) {
                const createdImages = yield prisma_1.prisma.image.createMany({
                    data: newImages.map((path) => ({
                        imagePath: path,
                    })),
                    skipDuplicates: true,
                });
                const images = yield prisma_1.prisma.image.findMany({
                    where: {
                        imagePath: {
                            in: newImages,
                        },
                    },
                });
                yield prisma_1.prisma.mosquitoImage.createMany({
                    data: images.map((img) => ({
                        mosquitoId: id,
                        imageId: img.id,
                    })),
                    skipDuplicates: true,
                });
            }
            const mosquitoWithImages = yield prisma_1.prisma.mosquito.findUnique({
                where: { id },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            if (!mosquitoWithImages)
                return null;
            const mapped = Object.assign(Object.assign({}, mosquitoWithImages), { images: mosquitoWithImages.images.map((img) => img.image) });
            return mapped;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.mosquitoImage.deleteMany({
                where: { mosquitoId: id },
            });
            yield prisma_1.prisma.mosquito.delete({ where: { id: id } });
        });
    }
}
exports.MosquitoRepositoryImpl = MosquitoRepositoryImpl;
