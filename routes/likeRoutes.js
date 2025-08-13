const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  likePostValidation,
} = require("../middlewares/validation/likeValidation");
const resultValidator = require("../middlewares/validation/resultValidator");

router.post(
  "/",
  authMiddleware,
  likePostValidation,
  resultValidator,
  likeController.likePost
);

module.exports = router;
