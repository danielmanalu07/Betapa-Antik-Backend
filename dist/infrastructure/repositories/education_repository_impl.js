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
exports.EducationRepositoryImpl = void 0;
const prisma_1 = require("../../config/prisma");
class EducationRepositoryImpl {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const educations = yield prisma_1.prisma.education.findMany({
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            const mapped = educations.map((education) => {
                var _a;
                return (Object.assign(Object.assign({}, education), { images: ((_a = education.images) === null || _a === void 0 ? void 0 : _a.map((ei) => ei.image)) || [] }));
            });
            return mapped;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const education = yield prisma_1.prisma.education.findUnique({
                where: { id },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            if (!education)
                return null;
            return Object.assign(Object.assign({}, education), { images: ((_a = education.images) === null || _a === void 0 ? void 0 : _a.map((ei) => ei.image)) || [] });
        });
    }
    create(data, imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const education = yield prisma_1.prisma.education.create({
                data: {
                    title: data.title,
                },
            });
            // Step 2: create Images
            const createdImages = yield prisma_1.prisma.image.createMany({
                data: imagePaths.map((path) => ({
                    imagePath: path,
                })),
                skipDuplicates: true,
            });
            // Step 3: fetch created images
            const images = yield prisma_1.prisma.image.findMany({
                where: {
                    imagePath: {
                        in: imagePaths,
                    },
                },
            });
            // Step 4: create relation in EducationImage
            yield prisma_1.prisma.educationImage.createMany({
                data: images.map((img) => ({
                    educationId: education.id,
                    imageId: img.id,
                })),
            });
            // Step 5: return with included images
            const result = yield prisma_1.prisma.education.findUnique({
                where: { id: education.id },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            return Object.assign(Object.assign({}, result), { images: result.images.map((ei) => ei.image) });
        });
    }
    update(id, data, imagePathsToLink, imageIdsToUnlink) {
        return __awaiter(this, void 0, void 0, function* () {
            // Step 1: Update data Education
            const updatedEducation = yield prisma_1.prisma.education.update({
                where: { id },
                data: {
                    title: data.title,
                },
            });
            // Step 2: Hapus relasi yang tidak diinginkan
            if (imageIdsToUnlink && imageIdsToUnlink.length > 0) {
                yield prisma_1.prisma.educationImage.deleteMany({
                    where: {
                        educationId: id,
                        imageId: { in: imageIdsToUnlink },
                    },
                });
            }
            // Step 3: Tambahkan gambar baru dan relasinya
            if (imagePathsToLink && imagePathsToLink.length > 0) {
                // Buat gambar baru
                const createdImages = yield prisma_1.prisma.image.createMany({
                    data: imagePathsToLink.map((path) => ({
                        imagePath: path,
                    })),
                    skipDuplicates: true,
                });
                // Ambil gambar yang baru dibuat
                const images = yield prisma_1.prisma.image.findMany({
                    where: {
                        imagePath: {
                            in: imagePathsToLink,
                        },
                    },
                });
                // Buat relasi di EducationImage
                yield prisma_1.prisma.educationImage.createMany({
                    data: images.map((img) => ({
                        educationId: id,
                        imageId: img.id,
                    })),
                    skipDuplicates: true,
                });
            }
            // Step 4: Ambil data Education yang diperbarui dengan gambar
            const educationWithImages = yield prisma_1.prisma.education.findUnique({
                where: { id },
                include: {
                    images: {
                        select: {
                            image: true,
                        },
                    },
                },
            });
            if (!educationWithImages)
                return null;
            return Object.assign(Object.assign({}, educationWithImages), { images: educationWithImages.images.map((ei) => ei.image) });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.educationImage.deleteMany({
                where: { educationId: id },
            });
            yield prisma_1.prisma.education.delete({ where: { id: id } });
        });
    }
}
exports.EducationRepositoryImpl = EducationRepositoryImpl;
