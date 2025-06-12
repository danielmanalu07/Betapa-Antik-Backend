import EducationUsecase from "../../usecases/education_usecase";
import { EducationRepositoryImpl } from "../repositories/education_repository_impl";

const repo = new EducationRepositoryImpl();
const EducationService = new EducationUsecase(repo);
export default EducationService;
