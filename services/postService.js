// services/postService.js
const Post = require("../models/Post");

const createPost = async ({ authorId, content, imageUrl, tags }) => {
  const newPost = new Post({
    authorId,
    content,
    imageUrl,
    tags,
  });

  await newPost.save();
  return newPost;
};

module.exports = {
  createPost,
};
