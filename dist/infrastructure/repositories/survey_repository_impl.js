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
exports.SurveyRepositoryImpl = void 0;
const prisma_1 = require("../../config/prisma");
class SurveyRepositoryImpl {
    updateImage(id, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.survey.update({
                where: { id },
                data: { bukti_gambar: fileName },
            });
        });
    }
    findAll(healthCenterId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.prisma.survey.findMany({
                where: {
                    healthCenterId: healthCenterId,
                },
            });
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.survey.findUnique({
                where: {
                    id: id,
                },
            });
            return data;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield prisma_1.prisma.survey.create({
                data: data,
            });
            return created;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield prisma_1.prisma.survey.update({
                where: {
                    id: id,
                },
                data: data,
            });
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.survey.delete({ where: { id: id } });
        });
    }
}
exports.SurveyRepositoryImpl = SurveyRepositoryImpl;
