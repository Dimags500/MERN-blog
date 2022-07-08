import { body } from "express-validator";

export const loginValidator = [
  body("email", "Email error").isEmail(),
  body("password", "Password error").isLength({ min: 6 }),
];
