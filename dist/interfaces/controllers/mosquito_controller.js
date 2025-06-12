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
exports.deleteMosquito = exports.updateMosquito = exports.createMosquito = exports.getByIdMosquito = exports.getAllMosquito = void 0;
const mosquito_service_1 = __importDefault(require("../../infrastructure/services/mosquito_service"));
const getBaseUrl_1 = require("../../utils/getBaseUrl");
const response_1 = __importDefault(require("../../utils/response"));
const HttpError_1 = require("../../utils/HttpError");
const imageHelper_1 = require("../../utils/imageHelper");
const getAllMosquito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mosquitos = yield mosquito_service_1.default.getAll();
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const newMosquitos = mosquitos.map((mosquito) => {
            var _a;
            return (Object.assign(Object.assign({}, mosquito), { images: (_a = mosquito.images) === null || _a === void 0 ? void 0 : _a.map((img) => (Object.assign(Object.assign({}, img), { imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}` }))) }));
        });
        return response_1.default.success(res, 200, "Mosquito Get Successfully", newMosquitos);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllMosquito = getAllMosquito;
const getByIdMosquito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const mosquito = yield mosquito_service_1.default.getById(id);
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const newMosquito = Object.assign(Object.assign({}, mosquito), { images: (_a = mosquito.images) === null || _a === void 0 ? void 0 : _a.map((img) => (Object.assign(Object.assign({}, img), { imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}` }))) });
        return response_1.default.success(res, 200, "Get Mosquito Successfully", newMosquito);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getByIdMosquito = getByIdMosquito;
const createMosquito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { title } = req.body;
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const uploadedFiles = req.files;
        const images = (_a = uploadedFiles.map((file) => file.filename)) !== null && _a !== void 0 ? _a : [];
        const mosquito = yield mosquito_service_1.default.create({ title }, images);
        const newMosquito = Object.assign(Object.assign({}, mosquito), { images: (_c = (_b = mosquito.images) === null || _b === void 0 ? void 0 : _b.map((img) => ({
                id: img.id,
                imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
                createdAt: img.createdAt,
                updatedAt: img.updatedAt,
            }))) !== null && _c !== void 0 ? _c : [] });
        return response_1.default.success(res, 201, "Mosquito Created Successfully", newMosquito);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.createMosquito = createMosquito;
const updateMosquito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const id = Number(req.params.id);
        const { title, imageIdsToUnlink } = req.body;
        const uploadedFiles = req.files;
        const newImages = (_a = uploadedFiles.map((file) => file.filename)) !== null && _a !== void 0 ? _a : [];
        const parsedImageIdsToUnlink = imageIdsToUnlink && Array.isArray(imageIdsToUnlink)
            ? imageIdsToUnlink.map(Number)
            : imageIdsToUnlink
                ? [Number(imageIdsToUnlink)]
                : [];
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updated = yield mosquito_service_1.default.update(id, { title }, newImages, parsedImageIdsToUnlink);
        const newUpdated = Object.assign(Object.assign({}, updated), { images: (_b = updated.images) === null || _b === void 0 ? void 0 : _b.map((img) => ({
                id: img.id,
                imagePath: `${baseUrl}/uploads/mosquito/${img.imagePath}`,
                createdAt: img.createdAt,
                updatedAt: img.updatedAt,
            })) });
        return response_1.default.success(res, 200, "Mosquito Updated Successfully", newUpdated);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateMosquito = updateMosquito;
const deleteMosquito = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const existing = yield mosquito_service_1.default.getById(id);
        if (existing.images && existing.images.length > 0) {
            existing.images.forEach((img) => {
                (0, imageHelper_1.deleteImageFile)(img.imagePath, "uploads/mosquito");
            });
        }
        yield mosquito_service_1.default.delete(id);
        return response_1.default.success(res, 200, "Mosquito Deleted Successfully");
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.deleteMosquito = deleteMosquito;
