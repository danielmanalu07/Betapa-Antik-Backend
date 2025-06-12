import { NextFunction, Request, Response } from "express";
import ResponseCustom from "../../utils/response";
import authService from "../../infrastructure/services/authService";
import jwt, { TokenExpiredError } from "jsonwebtoken";

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return ResponseCustom.error(res, 401, "Unauthorized");

  const blackListed = await authService.isTokenBlacklisted(token);
  if (blackListed)
    return ResponseCustom.error(res, 403, "Token is blacklisted");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return ResponseCustom.error(res, 403, "Token expired", error);
    }
    return ResponseCustom.error(res, 401, "Invalid token", error);
  }
};

export default authenticate;
