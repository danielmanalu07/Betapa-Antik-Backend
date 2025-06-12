import { Request, Response } from "express";
import ResponseCustom from "../../utils/response";
import authService from "../../infrastructure/services/authService";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import handleDuplicateError from "../../utils/errorHandler";
import { HttpError } from "../../utils/HttpError";

const register = async (req: Request, res: Response) => {
  try {
    const { username, password, name, email, confirmation_password } = req.body;
    const user = await authService.register(username, password, name, email);
    return ResponseCustom.success(res, 201, "User created successfully", user);
  } catch (error) {
    const { statusCode, message, error: errData } = handleDuplicateError(error);
    return ResponseCustom.error(res, statusCode, message, errData);
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const { token, user } = await authService.login(username, password);
    await authService.isTokenBlacklisted(token);
    return ResponseCustom.success(res, 200, "Login successful", {
      user,
      token,
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return ResponseCustom.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return ResponseCustom.error(
        res,
        401,
        "Unauthorized",
        "Token not provided"
      );

    await authService.logout(token);
    return ResponseCustom.success(res, 200, "Logout successful");
  } catch (error) {
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

const findUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const user = await authService.findUser(userId);
    return ResponseCustom.success(res, 200, "User found", user);
  } catch (error) {
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const { username, name, email } = req.body;
    const data = { username, name, email };
    const updatedUser = await authService.updateUser(userId, data);
    return ResponseCustom.success(res, 200, "User updated", updatedUser);
  } catch (error) {
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUser();
    return ResponseCustom.success(res, 200, "Get User Successfully", users);
  } catch (error) {
    if (error instanceof HttpError) {
      return ResponseCustom.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

const updateStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    const result = await authService.updateStatus(id, status);
    return ResponseCustom.success(
      res,
      200,
      "Update Status Successfully",
      result
    );
  } catch (error) {
    if (error instanceof HttpError) {
      return ResponseCustom.error(
        res,
        error.statusCode,
        error.message,
        error.error
      );
    }
    return ResponseCustom.error(res, 500, "Internal Server Error", error);
  }
};

export {
  register,
  login,
  logout,
  findUser,
  updateUser,
  getAllUser,
  updateStatus,
};
