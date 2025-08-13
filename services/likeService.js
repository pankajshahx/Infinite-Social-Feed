const Like = require("../models/Like");
const Post = require("../models/Post");
const User = require("../models/User");

const likePost = async ({ userId, postId }) => {
  // Check if already liked
  const existingLike = await Like.findOne({ userId, postId });
  if (existingLike) throw new Error("Post already liked");

  // Add like
  const newLike = new Like({ userId, postId });
  await newLike.save();

  // Increment likeCount in Post
  await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });

  // Fetch post details to get tags for personalization
  const post = await Post.findById(postId);
  if (post?.tags?.length) {
    await User.findByIdAndUpdate(userId, {
      $addToSet: { likedTags: { $each: post.tags } }, // add new tags without duplicates
    });
  }

  return newLike;
};

module.exports = {
  likePost,
};
