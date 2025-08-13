const { body } = require("express-validator");

const createPostValidation = [
  body("content").trim().notEmpty().withMessage("Content is required"),
  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array of strings"),
];

module.exports = {
  createPostValidation,
};
