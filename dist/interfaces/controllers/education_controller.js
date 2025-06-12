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
exports.deleteEducation = exports.updateEducation = exports.createEducation = exports.getByIdEducation = exports.getAllEducations = void 0;
const education_service_1 = __importDefault(require("../../infrastructure/services/education_service"));
const getBaseUrl_1 = require("../../utils/getBaseUrl");
const response_1 = __importDefault(require("../../utils/response"));
const HttpError_1 = require("../../utils/HttpError");
const imageHelper_1 = require("../../utils/imageHelper");
const getAllEducations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const educations = yield education_service_1.default.getAll();
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = educations.map((education) => {
            var _a;
            return (Object.assign(Object.assign({}, education), { images: (_a = education.images) === null || _a === void 0 ? void 0 : _a.map((img) => (Object.assign(Object.assign({}, img), { imagePath: `${baseUrl}/uploads/education/${img.imagePath}` }))) }));
        });
        return response_1.default.success(res, 200, "Educations fetched successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllEducations = getAllEducations;
const getByIdEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const education = yield education_service_1.default.getById(id);
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = Object.assign(Object.assign({}, education), { images: (_a = education.images) === null || _a === void 0 ? void 0 : _a.map((img) => (Object.assign(Object.assign({}, img), { imagePath: img.imagePath
                    ? `${baseUrl}/uploads/education/${img.imagePath}`
                    : null }))) });
        return response_1.default.success(res, 200, "Get Education Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getByIdEducation = getByIdEducation;
const createEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const { title } = req.body;
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const uploadedFiles = req.files;
        const images = (_a = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.map((file) => file.filename)) !== null && _a !== void 0 ? _a : [];
        const education = yield education_service_1.default.create({ title }, images);
        const updatedData = Object.assign(Object.assign({}, education), { images: (_c = (_b = education.images) === null || _b === void 0 ? void 0 : _b.map((img) => ({
                id: img.id,
                imagePath: `${baseUrl}/uploads/education/${img.imagePath}`,
                createdAt: img.createdAt,
                updatedAt: img.updatedAt,
            }))) !== null && _c !== void 0 ? _c : [] });
        return response_1.default.success(res, 201, "Education Created Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.createEducation = createEducation;
const updateEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const id = Number(req.params.id);
        const { title, imageIdsToUnlink } = req.body;
        const uploadedFiles = req.files;
        const imagePathsToLink = (_a = uploadedFiles === null || uploadedFiles === void 0 ? void 0 : uploadedFiles.map((file) => file.filename)) !== null && _a !== void 0 ? _a : [];
        const parsedImageIdsToUnlink = imageIdsToUnlink && Array.isArray(imageIdsToUnlink)
            ? imageIdsToUnlink.map(Number)
            : imageIdsToUnlink
                ? [Number(imageIdsToUnlink)]
                : [];
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updated = yield education_service_1.default.update(id, { title }, imagePathsToLink, parsedImageIdsToUnlink);
        const updatedData = Object.assign(Object.assign({}, updated), { images: (_c = (_b = updated.images) === null || _b === void 0 ? void 0 : _b.map((img) => ({
                id: img.id,
                imagePath: `${baseUrl}/uploads/education/${img.imagePath}`,
                createdAt: img.createdAt,
                updatedAt: img.updatedAt,
            }))) !== null && _c !== void 0 ? _c : [] });
        return response_1.default.success(res, 200, "Education Updated Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateEducation = updateEducation;
const deleteEducation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const existing = yield education_service_1.default.getById(id);
        if (existing.images && existing.images.length > 0) {
            existing.images.forEach((img) => {
                (0, imageHelper_1.deleteImageFile)(img.imagePath, "uploads/education");
            });
        }
        // Hapus data education di database
        yield education_service_1.default.delete(id);
        return response_1.default.success(res, 200, "Education deleted successfully");
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.deleteEducation = deleteEducation;
