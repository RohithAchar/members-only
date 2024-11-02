const bcrypt = require("bcryptjs");
const { body } = require("express-validator");

const SALT = bcrypt.genSaltSync(10);

const alphaErr = "must only contain letters.";
const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`First name must between 1 and 25 letters`),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage(`Last name ${alphaErr}.`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`Last name must between 1 and 25 letters.`),
  body("username")
    .trim()
    .isEmail()
    .withMessage("Username must be a valid email id."),
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Password must contain at least one special character."),
];

module.exports = {
  SALT,
  validateUser,
};
