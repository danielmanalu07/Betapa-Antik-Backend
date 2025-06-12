"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auhtMiddleware_1 = __importDefault(require("../middlewares/auhtMiddleware"));
const authValidator_1 = require("../../utils/validators/authValidator");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const health_center_controller_1 = require("../controllers/health_center_controller");
const health_center_validator_1 = require("../../utils/validators/health_center_validator");
const education_controller_1 = require("../controllers/education_controller");
const education_validator_1 = require("../../utils/validators/education_validator");
const video_controller_1 = require("../controllers/video_controller");
const video_validator_1 = require("../../utils/validators/video_validator");
const mosquito_controller_1 = require("../controllers/mosquito_controller");
const mosquito_validator_1 = require("../../utils/validators/mosquito_validator");
const survey_controller_1 = require("../controllers/survey_controller");
const survey_validator_1 = require("../../utils/validators/survey_validator");
const router = (0, express_1.Router)();
// Auth routes
router.post("/register", authValidator_1.registerValidator, validateRequest_1.default, authController_1.register);
router.post("/login", authValidator_1.loginValidator, validateRequest_1.default, authController_1.login);
router.post("/logout", auhtMiddleware_1.default, authController_1.logout);
router.get("/me", auhtMiddleware_1.default, authController_1.findUser);
router.put("/me", authValidator_1.updateUserValidator, auhtMiddleware_1.default, authController_1.updateUser);
router.get("/user", auhtMiddleware_1.default, authController_1.getAllUser);
router.put("/user/:id/update", auhtMiddleware_1.default, authController_1.updateStatus);
router.get("/user/video", video_controller_1.getAllVideo);
router.get("/user/education", education_controller_1.getAllEducations);
router.get("/user/education/:id", education_controller_1.getByIdEducation);
router.get("/user/mosquito", mosquito_controller_1.getAllMosquito);
router.get("/user/mosquito/:id", mosquito_controller_1.getByIdMosquito);
router.get("/user/healthCenter", health_center_controller_1.getAllHealthCenter);
router.get("/user/survey/all/:id", survey_controller_1.getAllSurvey);
// Health Center routes
const HealthCenterRouter = (0, express_1.Router)();
HealthCenterRouter.use(auhtMiddleware_1.default);
HealthCenterRouter.get("/", health_center_controller_1.getAllHealthCenter);
HealthCenterRouter.get("/:id", health_center_controller_1.getByIdHealthCenter);
HealthCenterRouter.post("/create", health_center_validator_1.upload.single("image"), health_center_validator_1.createHealthCenterValidator, validateRequest_1.default, health_center_controller_1.createHealthCenter);
HealthCenterRouter.put("/:id/edit", health_center_validator_1.upload.single("image"), health_center_validator_1.updateHealthCenterValidator, validateRequest_1.default, health_center_controller_1.updateHealthCenter);
HealthCenterRouter.delete("/:id/delete", health_center_controller_1.deleteHealthCenter);
// Education routes
const EducationRouter = (0, express_1.Router)();
EducationRouter.use(auhtMiddleware_1.default);
EducationRouter.get("/", education_controller_1.getAllEducations);
EducationRouter.get("/:id", education_controller_1.getByIdEducation);
EducationRouter.post("/create", education_validator_1.uploadEducation.array("images[]"), education_validator_1.createEducationValidator, validateRequest_1.default, education_controller_1.createEducation);
EducationRouter.put("/:id/edit", education_validator_1.uploadEducation.array("images[]"), education_validator_1.updateEducationValidator, validateRequest_1.default, education_controller_1.updateEducation);
EducationRouter.delete("/:id/delete", education_controller_1.deleteEducation);
//video routes
const VideoRouter = (0, express_1.Router)();
VideoRouter.use(auhtMiddleware_1.default);
VideoRouter.get("/", video_controller_1.getAllVideo);
VideoRouter.get("/:id", video_controller_1.getByIdVideo);
VideoRouter.post("/create", video_validator_1.createVideoValidator, validateRequest_1.default, video_controller_1.createVideo);
VideoRouter.put("/:id/edit", video_validator_1.updateVideoValidator, validateRequest_1.default, video_controller_1.updateVideo);
VideoRouter.delete("/:id/delete", video_controller_1.deleteVideo);
//Mosquito Routes
const MosquitoRouter = (0, express_1.Router)();
MosquitoRouter.use(auhtMiddleware_1.default);
MosquitoRouter.get("/", mosquito_controller_1.getAllMosquito);
MosquitoRouter.get("/:id", mosquito_controller_1.getByIdMosquito);
MosquitoRouter.post("/create", mosquito_validator_1.uploadMosquito.array("images[]"), mosquito_validator_1.createMosquitonValidator, validateRequest_1.default, mosquito_controller_1.createMosquito);
MosquitoRouter.put("/:id/edit", mosquito_validator_1.uploadMosquito.array("images[]"), mosquito_validator_1.updateMosquitoValidator, validateRequest_1.default, mosquito_controller_1.updateMosquito);
MosquitoRouter.delete("/:id/delete", mosquito_controller_1.deleteMosquito);
//survey routes
const SurveyRouter = (0, express_1.Router)();
SurveyRouter.use(auhtMiddleware_1.default);
SurveyRouter.get("/all/:id", survey_controller_1.getAllSurvey);
SurveyRouter.get("/:id", survey_controller_1.getByIdSurvey);
SurveyRouter.post("/create", survey_validator_1.uploadSurvey.single("bukti_gambar"), survey_validator_1.createSurveyValidator, validateRequest_1.default, survey_controller_1.createSurvey);
SurveyRouter.put("/:id/edit", survey_validator_1.uploadSurvey.single("bukti_gambar"), survey_validator_1.updateSurveyValidator, validateRequest_1.default, survey_controller_1.updateSurvey);
SurveyRouter.delete("/:id/delete", survey_controller_1.deleteSurvey);
// Mount sub-routers dengan prefix path
router.use("/healthCenter", HealthCenterRouter);
router.use("/education", EducationRouter);
router.use("/video", VideoRouter);
router.use("/mosquito", MosquitoRouter);
router.use("/survey", SurveyRouter);
exports.default = router;
