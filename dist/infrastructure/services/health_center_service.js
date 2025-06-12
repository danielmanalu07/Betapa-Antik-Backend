"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const health_center_usecase_1 = __importDefault(require("../../usecases/health_center_usecase"));
const health_center_repository_impl_1 = require("../repositories/health_center_repository_impl");
const repo = new health_center_repository_impl_1.HealthCenterRepositoryImpl();
const healthCenterService = new health_center_usecase_1.default(repo);
exports.default = healthCenterService;
