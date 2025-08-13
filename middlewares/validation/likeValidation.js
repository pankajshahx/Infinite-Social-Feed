const { body } = require("express-validator");

const likePostValidation = [
  body("postId")
    .notEmpty()
    .withMessage("postId is required")
    .isMongoId()
    .withMessage("postId must be a valid Mongo ObjectId"),
];

module.exports = {
  likePostValidation,
};
