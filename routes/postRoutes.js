const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  createPostValidation,
} = require("../middlewares/validation/postValidation");
const resultValidator = require("../middlewares/validation/resultValidator");

router.post(
  "/",
  authMiddleware,
  createPostValidation,
  resultValidator,
  postController.createPost
);

module.exports = router;
