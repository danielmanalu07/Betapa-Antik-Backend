"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const video_usecase_1 = __importDefault(require("../../usecases/video_usecase"));
const video_repository_impl_1 = __importDefault(require("../repositories/video_repository_impl"));
const repo = new video_repository_impl_1.default();
const VideoService = new video_usecase_1.default(repo);
exports.default = VideoService;
