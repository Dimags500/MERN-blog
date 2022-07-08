import { body } from "express-validator";

export const postValidator = [
  body("title", "title").isLength({ min: 4 }).isString(),
  body("text", "Enter text").isLength({ min: 10 }).isString(),
  body("tags", "tags array ").optional().isArray(),
  body("imageUrl", "Wrong image Url ").optional().isString(),
];
