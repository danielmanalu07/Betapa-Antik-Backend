import { body, validationResult } from "express-validator";
import multer, { FileFilterCallback } from "multer";
import CustomResponse from "../response";
import { Request, Response } from "express";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/education/");
  },
  filename: (req, file, cb) => {
    const fieldName = file.fieldname.replace("[]", "");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${fieldName}-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
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

const uploadEducation = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const createEducationValidator = [
  (req: Request, res: Response, next: Function) => {
    const { title } = req.body;

    if (!title) {
      return CustomResponse.error(res, 400, "Title is required");
    }

    if (!req.files || (Array.isArray(req.files) && req.files.length === 0)) {
      return CustomResponse.error(res, 400, "At least one image is required");
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

const updateEducationValidator = [
  body("title").optional().isString().withMessage("Title must be a string"),
  body("imageIdsToDelete")
    .optional()
    .isArray()
    .withMessage("imageIdsToDelete must be an array of image IDs")
    .custom((value) => value.every(Number.isInteger))
    .withMessage("imageIdsToDelete must contain only integers"),
];

export { uploadEducation, createEducationValidator, updateEducationValidator };
