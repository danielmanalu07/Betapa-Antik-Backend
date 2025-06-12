import { body } from "express-validator";

const registerValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("email").notEmpty().withMessage("email is required"),
  body("password").notEmpty().withMessage("password is required"),
  body("confirmation_password")
    .notEmpty()
    .withMessage("confirmation password is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords do not match");
      }
      return true;
    }),
];

const loginValidator = [
  body("username").notEmpty().withMessage("Username is required"),
  body("password").notEmpty().withMessage("password is required"),
];

const updateUserValidator = [
  body("username").optional().notEmpty().withMessage("name is required"),
  body("name").optional().notEmpty().withMessage("name is required"),
  body("email").optional().notEmpty().withMessage("email is required"),
];

export { registerValidator, loginValidator, updateUserValidator };
