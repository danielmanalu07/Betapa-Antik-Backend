import AuthUseCase from "../../usecases/authUseCase";
import { AuthRepositoryImpl } from "../repositories/authRepositoryImpl";

const repo = new AuthRepositoryImpl();
const authService = new AuthUseCase(repo);
export default authService;
