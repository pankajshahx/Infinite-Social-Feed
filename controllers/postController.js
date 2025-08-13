// controllers/postController.js
const postService = require("../services/postService");

const createPost = async (req, res) => {
  try {
    const { content, imageUrl, tags } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    // `req.user` is set by authMiddleware after verifying token
    const authorId = req.user.id;

    const post = await postService.createPost({
      authorId,
      content,
      imageUrl,
      tags,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createPost,
};
