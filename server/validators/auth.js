import { body } from "express-validator";

export const registerValidator = [
  body("email", "Email error").isEmail(),
  body("password", "Password error").isLength({ min: 6 }),
  body("fullName", "FullName").isLength({ min: 3 }),
  body("avatarUrl", "Wrong avatar Url ").optional().isURL(),
];
