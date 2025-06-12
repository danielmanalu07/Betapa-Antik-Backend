import HealthCenterUsecase from "../../usecases/health_center_usecase";
import { HealthCenterRepositoryImpl } from "../repositories/health_center_repository_impl";

const repo = new HealthCenterRepositoryImpl();
const healthCenterService = new HealthCenterUsecase(repo);
export default healthCenterService;
