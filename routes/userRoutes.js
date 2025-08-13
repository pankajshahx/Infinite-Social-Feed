const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validation/userValidation");
const resultValidator = require("../middlewares/validation/resultValidator");
const { loginLimiter } = require("../middlewares/rateLimiter");

router.post(
  "/register",
  registerValidation,
  resultValidator,
  userController.register
);

router.post(
  "/login",
  loginLimiter,
  loginValidation,
  resultValidator,
  userController.login
);

router.post("/logout", userController.logout);

router.get("/profile", authMiddleware, userController.getProfile);

module.exports = router;
