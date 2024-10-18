const db = require("../database/queries");
const { body, validationResult } = require("express-validator");

const validateSignup = [
  body("firstname")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("First name must be between 1 and 50 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage(
      "First name must contain only alphabetic characters and spaces"
    ),

  body("lastname")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Last name must be between 1 and 50 characters")
    .isAlpha("en-US", { ignore: " " })
    .withMessage(
      "Last name must contain only alphabetic characters and spaces"
    ),

  body("username")
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage("Username must be between 3 and 30 characters")
    .isAlphanumeric()
    .withMessage("Username must contain only letters and numbers"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[!@#$%^&*]/)
    .withMessage("Password must contain at least one special character"),

  body("confirmPassword")
    .trim()
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match"),
];

exports.createUser = [
  validateSignup,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("signup", {
        errors: errors.array(),
      });
    }
    const { firstname, lastname, username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hashedpassword) => {
      if (err) {
        return next(err);
      }
      await db.addUser({ firstname, lastname, username, hashedpassword });
      res.redirect("/");
    });
  },
];
