"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const education_usecase_1 = __importDefault(require("../../usecases/education_usecase"));
const education_repository_impl_1 = require("../repositories/education_repository_impl");
const repo = new education_repository_impl_1.EducationRepositoryImpl();
const EducationService = new education_usecase_1.default(repo);
exports.default = EducationService;
