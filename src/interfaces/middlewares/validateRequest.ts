import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import CustomResponse from "../../utils/response";

const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => ({
      message: err.msg,
    }));
    return CustomResponse.error(res, 400, "Validation failed", errorMessages);
  }
  next();
};

export default validateRequest;
