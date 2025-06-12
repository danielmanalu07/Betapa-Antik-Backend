import MosquitoUsecase from "../../usecases/mosquito_usecase";
import { MosquitoRepositoryImpl } from "../repositories/mosquito_repository_impl";

const repo = new MosquitoRepositoryImpl();
const MosquitoService = new MosquitoUsecase(repo);
export default MosquitoService;
