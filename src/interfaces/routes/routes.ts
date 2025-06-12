import { Router } from "express";
import {
  findUser,
  getAllUser,
  login,
  logout,
  register,
  updateStatus,
  updateUser,
} from "../controllers/authController";
import authenticate from "../middlewares/auhtMiddleware";
import {
  loginValidator,
  registerValidator,
  updateUserValidator,
} from "../../utils/validators/authValidator";
import validateRequest from "../middlewares/validateRequest";
import {
  createHealthCenter,
  deleteHealthCenter,
  getAllHealthCenter,
  getByIdHealthCenter,
  updateHealthCenter,
} from "../controllers/health_center_controller";
import {
  createHealthCenterValidator,
  updateHealthCenterValidator,
  upload,
} from "../../utils/validators/health_center_validator";
import {
  createEducation,
  deleteEducation,
  getAllEducations,
  getByIdEducation,
  updateEducation,
} from "../controllers/education_controller";
import {
  createEducationValidator,
  updateEducationValidator,
  uploadEducation,
} from "../../utils/validators/education_validator";
import {
  createVideo,
  deleteVideo,
  getAllVideo,
  getByIdVideo,
  updateVideo,
} from "../controllers/video_controller";
import {
  createVideoValidator,
  updateVideoValidator,
} from "../../utils/validators/video_validator";
import {
  createMosquito,
  deleteMosquito,
  getAllMosquito,
  getByIdMosquito,
  updateMosquito,
} from "../controllers/mosquito_controller";
import {
  createMosquitonValidator,
  updateMosquitoValidator,
  uploadMosquito,
} from "../../utils/validators/mosquito_validator";
import {
  createSurvey,
  deleteSurvey,
  getAllSurvey,
  getByIdSurvey,
  updateSurvey,
} from "../controllers/survey_controller";
import {
  createSurveyValidator,
  updateSurveyValidator,
  uploadSurvey,
} from "../../utils/validators/survey_validator";

const router = Router();

// Auth routes
router.post("/register", registerValidator, validateRequest, register);
router.post("/login", loginValidator, validateRequest, login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, findUser);
router.put("/me", updateUserValidator, authenticate, updateUser);
router.get("/user", authenticate, getAllUser);
router.put("/user/:id/update", authenticate, updateStatus);
router.get("/user/video", getAllVideo);
router.get("/user/education", getAllEducations);
router.get("/user/education/:id", getByIdEducation);
router.get("/user/mosquito", getAllMosquito);
router.get("/user/mosquito/:id", getByIdMosquito);
router.get("/user/healthCenter", getAllHealthCenter);
router.get("/user/survey/all/:id", getAllSurvey);

// Health Center routes
const HealthCenterRouter = Router();
HealthCenterRouter.use(authenticate);

HealthCenterRouter.get("/", getAllHealthCenter);
HealthCenterRouter.get("/:id", getByIdHealthCenter);
HealthCenterRouter.post(
  "/create",
  upload.single("image"),
  createHealthCenterValidator,
  validateRequest,
  createHealthCenter
);
HealthCenterRouter.put(
  "/:id/edit",
  upload.single("image"),
  updateHealthCenterValidator,
  validateRequest,
  updateHealthCenter
);
HealthCenterRouter.delete("/:id/delete", deleteHealthCenter);

// Education routes
const EducationRouter = Router();
EducationRouter.use(authenticate);

EducationRouter.get("/", getAllEducations);
EducationRouter.get("/:id", getByIdEducation);
EducationRouter.post(
  "/create",
  uploadEducation.array("images[]"),
  createEducationValidator,
  validateRequest,
  createEducation
);
EducationRouter.put(
  "/:id/edit",
  uploadEducation.array("images[]"),
  updateEducationValidator,
  validateRequest,
  updateEducation
);
EducationRouter.delete("/:id/delete", deleteEducation);

//video routes
const VideoRouter = Router();
VideoRouter.use(authenticate);

VideoRouter.get("/", getAllVideo);
VideoRouter.get("/:id", getByIdVideo);
VideoRouter.post("/create", createVideoValidator, validateRequest, createVideo);
VideoRouter.put(
  "/:id/edit",
  updateVideoValidator,
  validateRequest,
  updateVideo
);
VideoRouter.delete("/:id/delete", deleteVideo);

//Mosquito Routes
const MosquitoRouter = Router();
MosquitoRouter.use(authenticate);
MosquitoRouter.get("/", getAllMosquito);
MosquitoRouter.get("/:id", getByIdMosquito);
MosquitoRouter.post(
  "/create",
  uploadMosquito.array("images[]"),
  createMosquitonValidator,
  validateRequest,
  createMosquito
);
MosquitoRouter.put(
  "/:id/edit",
  uploadMosquito.array("images[]"),
  updateMosquitoValidator,
  validateRequest,
  updateMosquito
);
MosquitoRouter.delete("/:id/delete", deleteMosquito);

//survey routes
const SurveyRouter = Router();
SurveyRouter.use(authenticate);
SurveyRouter.get("/all/:id", getAllSurvey);
SurveyRouter.get("/:id", getByIdSurvey);
SurveyRouter.post(
  "/create",
  uploadSurvey.single("bukti_gambar"),
  createSurveyValidator,
  validateRequest,
  createSurvey
);
SurveyRouter.put(
  "/:id/edit",
  uploadSurvey.single("bukti_gambar"),
  updateSurveyValidator,
  validateRequest,
  updateSurvey
);
SurveyRouter.delete("/:id/delete", deleteSurvey);

// Mount sub-routers dengan prefix path
router.use("/healthCenter", HealthCenterRouter);
router.use("/education", EducationRouter);
router.use("/video", VideoRouter);
router.use("/mosquito", MosquitoRouter);
router.use("/survey", SurveyRouter);

export default router;
