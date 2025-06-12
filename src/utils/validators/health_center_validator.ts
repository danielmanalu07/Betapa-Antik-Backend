import { body, validationResult } from "express-validator";
import multer, { FileFilterCallback } from "multer";
import CustomResponse from "../response";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/healthCenter/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`
    );
  },
});

// Filter untuk hanya menerima file gambar
const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, and JPG files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const createHealthCenterValidator = [
  // body("name").notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: Function) => {
    const { name } = req.body;
    if (!name) {
      return CustomResponse.error(res, 400, "Name is required");
    }
    if (!req.file) {
      return CustomResponse.error(res, 400, "Image is required");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomResponse.error(
        res,
        400,
        "Validation failed",
        errors.array()
      );
    }
    next();
  },
];

const updateHealthCenterValidator = [
  // body("name").notEmpty().withMessage("Name is required"),
  (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return CustomResponse.error(
        res,
        400,
        "Validation failed",
        errors.array()
      );
    }
    next();
  },
];

export { upload, createHealthCenterValidator, updateHealthCenterValidator };
