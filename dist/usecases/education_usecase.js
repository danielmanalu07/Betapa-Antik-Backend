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
const HttpError_1 = require("../utils/HttpError");
class EducationUsecase {
    constructor(repo) {
        this.repo = repo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const educations = yield this.repo.findAll();
            const data = educations.map((education) => {
                var _a;
                return (Object.assign(Object.assign({}, education), { images: ((_a = education.images) === null || _a === void 0 ? void 0 : _a.map((imgWrapper) => ({
                        id: imgWrapper.id,
                        imagePath: imgWrapper.imagePath,
                        createdAt: imgWrapper.createdAt,
                        updatedAt: imgWrapper.updatedAt,
                    }))) || [] }));
            });
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const education = yield this.repo.findById(id);
            if (!education)
                throw new HttpError_1.HttpError("Education not found", 404);
            return education;
        });
    }
    create(data, imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const newEducation = yield this.repo.create(data, imagePaths);
            return newEducation;
        });
    }
    update(id, data, imagePathsToLink, imageIdsToUnlink) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEducation = yield this.repo.findById(id);
            if (!existingEducation)
                throw new HttpError_1.HttpError("Education not found", 404);
            const updatedEducation = yield this.repo.update(id, data, imagePathsToLink, imageIdsToUnlink);
            if (!updatedEducation)
                throw new HttpError_1.HttpError("Failed to update education", 400);
            const res = Object.assign({}, updatedEducation);
            return res;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingEducation = yield this.repo.findById(id);
            if (!existingEducation)
                throw new HttpError_1.HttpError("Education not found", 404);
            return yield this.repo.delete(id);
        });
    }
}
exports.default = EducationUsecase;
