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
class MosquitoUsecase {
    constructor(repo) {
        this.repo = repo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const mosquitos = yield this.repo.findAll();
            const data = mosquitos.map((mosquito) => {
                var _a;
                return (Object.assign(Object.assign({}, mosquito), { images: ((_a = mosquito.images) === null || _a === void 0 ? void 0 : _a.map((img) => ({
                        id: img.id,
                        imagePath: img.imagePath,
                        createdAt: img.createdAt,
                        updatedAt: img.updatedAt,
                    }))) || [] }));
            });
            return data;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const mosquito = yield this.repo.findById(id);
            if (!mosquito)
                throw new HttpError_1.HttpError("Mosquito Not Found", 404);
            return mosquito;
        });
    }
    create(data, imagePaths) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMosquito = yield this.repo.create(data, imagePaths);
            return newMosquito;
        });
    }
    update(id, data, newImages, imageIdsToUnlink) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMosquito = yield this.repo.findById(id);
            if (!existingMosquito)
                throw new HttpError_1.HttpError("Mosquito Not Found", 404);
            const updatedMosquito = yield this.repo.update(id, data, newImages, imageIdsToUnlink);
            if (!updatedMosquito)
                throw new HttpError_1.HttpError("Failed to update mosquito", 400);
            const res = Object.assign({}, updatedMosquito);
            return res;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingMosquito = yield this.repo.findById(id);
            if (!existingMosquito)
                throw new HttpError_1.HttpError("Mosquito Not Found", 404);
            return yield this.repo.delete(id);
        });
    }
}
exports.default = MosquitoUsecase;
