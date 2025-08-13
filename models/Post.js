const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    // Reference to the user who created the post
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Main content
    content: {
      type: String,
      required: true,
      trim: true,
    },

    // Optional image or video URL
    imageUrl: {
      type: String,
      default: null,
    },

    // Tags for personalization & ranking
    tags: {
      type: [String],
      default: [],
      index: true, // allows searching/filtering by tags
    },

    // Cached count of likes (for ranking efficiency)
    likeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt for recency scoring
  }
);

// Indexes to make queries faster
PostSchema.index({ createdAt: -1 });
PostSchema.index({ authorId: 1 });

module.exports = mongoose.model("Post", PostSchema);
