"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mosquito_usecase_1 = __importDefault(require("../../usecases/mosquito_usecase"));
const mosquito_repository_impl_1 = require("../repositories/mosquito_repository_impl");
const repo = new mosquito_repository_impl_1.MosquitoRepositoryImpl();
const MosquitoService = new mosquito_usecase_1.default(repo);
exports.default = MosquitoService;
