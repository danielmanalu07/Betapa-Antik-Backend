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
exports.deleteHealthCenter = exports.updateHealthCenter = exports.createHealthCenter = exports.getByIdHealthCenter = exports.getAllHealthCenter = void 0;
const health_center_service_1 = __importDefault(require("../../infrastructure/services/health_center_service"));
const response_1 = __importDefault(require("../../utils/response"));
const HttpError_1 = require("../../utils/HttpError");
const getBaseUrl_1 = require("../../utils/getBaseUrl");
const imageHelper_1 = require("../../utils/imageHelper");
const getAllHealthCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const healthCenters = yield health_center_service_1.default.getAll();
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = healthCenters.map((item) => (Object.assign(Object.assign({}, item), { image: item.image
                ? `${baseUrl}/uploads/healthCenter/${item.image}`
                : null })));
        return response_1.default.success(res, 200, "Get All Health Center Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllHealthCenter = getAllHealthCenter;
const getByIdHealthCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const healthCenter = yield health_center_service_1.default.getById(id);
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = Object.assign(Object.assign({}, healthCenter), { image: healthCenter.image
                ? `${baseUrl}/uploads/healthCenter/${healthCenter.image}`
                : null });
        return response_1.default.success(res, 200, "Get Health Center Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getByIdHealthCenter = getByIdHealthCenter;
const createHealthCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const healthCenter = yield health_center_service_1.default.create({
            name: name,
            image: image,
        });
        let finalImage = null;
        if (image) {
            finalImage = (0, imageHelper_1.renameImageFile)(image, name, healthCenter.id, "uploads/healthCenter");
            yield health_center_service_1.default.updateImage(healthCenter.id, yield finalImage);
        }
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        return response_1.default.success(res, 201, "Health Center Created Successfully", Object.assign(Object.assign({}, healthCenter), { image: finalImage
                ? `${baseUrl}/uploads/healthCenter/${finalImage}`
                : null }));
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.createHealthCenter = createHealthCenter;
const updateHealthCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const { name } = req.body;
        const image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
        const existing = yield health_center_service_1.default.getById(id);
        const healthCenter = yield health_center_service_1.default.update(id, { name, image });
        const finalImage = existing.image;
        if (image) {
            const finalImage = yield (0, imageHelper_1.replaceImageFile)(existing.image, image, name, id, "uploads/healthCenter");
            yield health_center_service_1.default.updateImage(id, finalImage);
        }
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        return response_1.default.success(res, 200, "Health Center Updated Successfully", Object.assign(Object.assign({}, healthCenter), { image: finalImage
                ? `${baseUrl}/uploads/healthCenter/${finalImage}`
                : null }));
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateHealthCenter = updateHealthCenter;
const deleteHealthCenter = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const existing = yield health_center_service_1.default.getById(id);
        if (existing.image) {
            (0, imageHelper_1.deleteImageFile)(existing.image, "uploads/healthCenter");
        }
        yield health_center_service_1.default.delete(id);
        return response_1.default.success(res, 200, "Health Center Deleted Successfully");
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.deleteHealthCenter = deleteHealthCenter;
