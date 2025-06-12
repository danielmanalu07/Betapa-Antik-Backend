"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const survey_usecase_1 = __importDefault(require("../../usecases/survey_usecase"));
const survey_repository_impl_1 = require("../repositories/survey_repository_impl");
const repo = new survey_repository_impl_1.SurveyRepositoryImpl();
const surveyService = new survey_usecase_1.default(repo);
exports.default = surveyService;
