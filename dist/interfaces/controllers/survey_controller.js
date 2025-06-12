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
exports.deleteSurvey = exports.updateSurvey = exports.createSurvey = exports.getByIdSurvey = exports.getAllSurvey = void 0;
const HttpError_1 = require("../../utils/HttpError");
const response_1 = __importDefault(require("../../utils/response"));
const survey_service_1 = __importDefault(require("../../infrastructure/services/survey_service"));
const getBaseUrl_1 = require("../../utils/getBaseUrl");
const imageHelper_1 = require("../../utils/imageHelper");
const getAllSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const healthCenterId = Number(req.params.id);
        const surveys = yield survey_service_1.default.getAll(healthCenterId);
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = surveys.map((item) => (Object.assign(Object.assign({}, item), { bukti_gambar: item.bukti_gambar
                ? `${baseUrl}/uploads/survey/${item.bukti_gambar}`
                : null })));
        return response_1.default.success(res, 200, "Get All Surveys Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getAllSurvey = getAllSurvey;
const getByIdSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const survey = yield survey_service_1.default.getById(id);
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        const updatedData = Object.assign(Object.assign({}, survey), { image: survey.bukti_gambar
                ? `${baseUrl}/uploads/survey/${survey.bukti_gambar}`
                : null });
        return response_1.default.success(res, 200, "Get Survey Successfully", updatedData);
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.getByIdSurvey = getByIdSurvey;
const createSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = req.user.id;
        const { healthCenterId, nama_lengkap_responden, kelurahan, rt, rw, jumlah_anggota_keluarga, jumlah_penampungan_air, jumlah_jentik, jenis_penampungan_dirumah, jenis_penampungan_diluar, kuras_penampungan_air, terkena_dbd, catatan, } = req.body;
        const bukti_gambar = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const data = {
            userId: Number(userId),
            healthCenterId: Number(healthCenterId),
            nama_lengkap_responden,
            kelurahan,
            rt,
            rw,
            jumlah_anggota_keluarga: Number(jumlah_anggota_keluarga),
            jumlah_penampungan_air: Number(jumlah_penampungan_air),
            jumlah_jentik: Number(jumlah_jentik),
            jenis_penampungan_dirumah,
            jenis_penampungan_diluar,
            kuras_penampungan_air,
            terkena_dbd,
            bukti_gambar,
            catatan,
        };
        const survey = yield survey_service_1.default.create(data);
        let finalImage = null;
        if (bukti_gambar) {
            finalImage = (0, imageHelper_1.renameImageFile)(bukti_gambar, kelurahan, survey.id, "uploads/survey");
            yield survey_service_1.default.updateImage(survey.id, yield finalImage);
        }
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        return response_1.default.success(res, 201, "Survey Created Successfully", Object.assign(Object.assign({}, survey), { bukti_gambar: finalImage
                ? `${baseUrl}/uploads/survey/${finalImage}`
                : null }));
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.createSurvey = createSurvey;
const updateSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const id = Number(req.params.id);
        const userId = req.user.id;
        const { healthCenterId, nama_lengkap_responden, kelurahan, rt, rw, jumlah_anggota_keluarga, jumlah_penampungan_air, jumlah_jentik, jenis_penampungan_dirumah, jenis_penampungan_diluar, kuras_penampungan_air, terkena_dbd, catatan, } = req.body;
        const bukti_gambar = ((_a = req.file) === null || _a === void 0 ? void 0 : _a.filename) || "";
        const data = {
            userId: Number(userId),
            healthCenterId: Number(healthCenterId),
            nama_lengkap_responden,
            kelurahan,
            rt,
            rw,
            jumlah_anggota_keluarga: Number(jumlah_anggota_keluarga),
            jumlah_penampungan_air: Number(jumlah_penampungan_air),
            jumlah_jentik: Number(jumlah_jentik),
            jenis_penampungan_dirumah,
            jenis_penampungan_diluar,
            kuras_penampungan_air,
            terkena_dbd,
            bukti_gambar,
            catatan,
        };
        const survey = yield survey_service_1.default.update(id, data);
        const existing = yield survey_service_1.default.getById(id);
        const finalImage = existing.bukti_gambar;
        if (bukti_gambar) {
            const finalImage = (0, imageHelper_1.replaceImageFile)(existing.bukti_gambar, bukti_gambar, kelurahan, id, "uploads/survey");
            yield survey_service_1.default.updateImage(survey.id, yield finalImage);
        }
        const baseUrl = (0, getBaseUrl_1.getBaseUrl)(req);
        return response_1.default.success(res, 200, "Survey Updated Successfully", Object.assign(Object.assign({}, survey), { bukti_gambar: finalImage
                ? `${baseUrl}/uploads/survey/${finalImage}`
                : null }));
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.updateSurvey = updateSurvey;
const deleteSurvey = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const existing = yield survey_service_1.default.getById(id);
        if (existing.bukti_gambar) {
            (0, imageHelper_1.deleteImageFile)(existing.bukti_gambar, "uploads/survey");
        }
        yield survey_service_1.default.delete(id);
        return response_1.default.success(res, 200, "Survey Deleted Successfully");
    }
    catch (error) {
        if (error instanceof HttpError_1.HttpError) {
            return response_1.default.error(res, error.statusCode, error.message, error.error);
        }
        return response_1.default.error(res, 500, "Internal Server Error", error);
    }
});
exports.deleteSurvey = deleteSurvey;
