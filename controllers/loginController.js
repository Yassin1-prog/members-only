const db = require("../database/queries");
const { body, validationResult } = require("express-validator");

const validateLogin = [
  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
