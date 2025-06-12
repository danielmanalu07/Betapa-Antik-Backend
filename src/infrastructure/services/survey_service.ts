import SurveyUseCase from "../../usecases/survey_usecase";
import { SurveyRepositoryImpl } from "../repositories/survey_repository_impl";

const repo = new SurveyRepositoryImpl();
const surveyService = new SurveyUseCase(repo);
export default surveyService;
