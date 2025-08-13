const likeService = require("../services/likeService");

const likePost = async (req, res) => {
  try {
    const { postId } = req.body;
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const userId = req.user.id;
    const like = await likeService.likePost({ userId, postId });

    res.status(201).json({ message: "Post liked successfully", like });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  likePost,
};
