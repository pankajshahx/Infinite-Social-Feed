const express = require("express");
const router = express.Router();
const feedController = require("../controllers/feedController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET /feed - protected route to get paginated feed
router.get("/", authMiddleware, feedController.getFeed);

module.exports = router;
