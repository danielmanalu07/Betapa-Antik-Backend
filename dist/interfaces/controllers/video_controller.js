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
exports.deleteVideo = exports.updateVideo = exports.createVideo = exports.getByIdVideo = exports.getAllVideo = void 0;
const video_service_1 = __importDefault(require("../../infrastructure/services/video_service"));
const response_1 = __importDefault(require("../../utils/response"));
const HttpError_1 = require("../../utils/HttpError");
const getAllVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const videos = yield video_service_1.default.getAll();
        return response_1.default.success(res, 200, "Get Video Successfully", videos);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllVideo = getAllVideo;
const getByIdVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const video = yield video_service_1.default.getById(id);
        return response_1.default.success(res, 200, "Get Video Detail Successfully", video);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error");
    }
});
exports.getByIdVideo = getByIdVideo;
const createVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, url } = req.body;
        const video = yield video_service_1.default.create({ title, url });
        return response_1.default.success(res, 201, "Created Video Successfully", video);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.createVideo = createVideo;
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { title, url } = req.body;
        const updated = yield video_service_1.default.update(id, { title, url });
        return response_1.default.success(res, 200, "Updated Video Successfully", updated);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateVideo = updateVideo;
const deleteVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        yield video_service_1.default.delete(id);
        return response_1.default.success(res, 200, "Delete Video Successfully");
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.deleteVideo = deleteVideo;
