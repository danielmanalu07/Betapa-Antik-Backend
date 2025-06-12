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
class HealthCenterUsecase {
    constructor(repo) {
        this.repo = repo;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const healthCenters = yield this.repo.findAll();
            if (!healthCenters) {
                throw new HttpError_1.HttpError("Health Center Is Empty!", 404);
            }
            return healthCenters;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const healthCenter = yield this.repo.findById(id);
            if (!healthCenter) {
                throw new HttpError_1.HttpError("Health Center Not Found!", 404);
            }
            return healthCenter;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield this.repo.create(data);
            if (!created)
                throw new HttpError_1.HttpError("Created Failed", 400);
            return created;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const healthCenter = yield this.repo.findById(id);
            if (!healthCenter)
                throw new HttpError_1.HttpError("Health Center Not Found!", 404);
            const updated = yield this.repo.update(id, data);
            if (!updated)
                throw new HttpError_1.HttpError("Updated failed", 400);
            return updated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.delete(id);
        });
    }
    updateImage(id, fileName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.updateImage(id, fileName);
        });
    }
}
exports.default = HealthCenterUsecase;
