import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import CustomResponse from "../response";

const createVideoValidator = [
  (req: Request, res: Response, next: Function) => {
    const { title, url } = req.body;
    if (!title) {
      return CustomResponse.error(res, 400, "Title is Required");
    }
    if (!url) {
      return CustomResponse.error(res, 400, "Url is Required");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomResponse.error(
        res,
        400,
        "validation failed",
        errors.array()
      );
    }
    next();
  },
];

const updateVideoValidator = [
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomResponse.error(
        res,
        400,
        "validation failed",
        errors.array()
      );
    }
    next();
  },
];

export { createVideoValidator, updateVideoValidator };
