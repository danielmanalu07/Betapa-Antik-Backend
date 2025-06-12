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
class SurveyUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    getAll(healthCenterId) {
        return __awaiter(this, void 0, void 0, function* () {
            const surveys = yield this.repo.findAll(healthCenterId);
            if (!surveys) {
                throw new HttpError_1.HttpError("Survey list is empty!", 404);
            }
            return surveys;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield this.repo.findById(id);
            if (!survey) {
                throw new HttpError_1.HttpError("Survey not found!", 404);
            }
            return survey;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield this.repo.create(data);
            if (!created)
                throw new HttpError_1.HttpError("Creation failed", 400);
            return created;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const survey = yield this.repo.findById(id);
            if (!survey)
                throw new HttpError_1.HttpError("Survey not found!", 404);
            const updated = yield this.repo.update(id, data);
            if (!updated)
                throw new HttpError_1.HttpError("Update failed", 400);
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
exports.default = SurveyUseCase;
