const mongoose = require("mongoose");

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only when like is created
  }
);

// Prevent duplicate likes from same user on same post
LikeSchema.index({ postId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Like", LikeSchema);
