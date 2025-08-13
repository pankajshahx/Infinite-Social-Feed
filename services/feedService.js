const Post = require("../models/Post");
const User = require("../models/User");

const TAG_MATCH_WEIGHT = 3;
const RECENCY_WEIGHT = 2;
const LIKE_COUNT_WEIGHT = 1;
const MAX_RECENCY_HOURS = 48;

const getFeed = async (userId, page = 1, limit = 10) => {
  const user = await User.findById(userId);
  const likedTags = user?.likedTags || [];

  const now = new Date();

  // Find posts created within the last MAX_RECENCY_HOURS
  const recentThreshold = new Date(
    now.getTime() - MAX_RECENCY_HOURS * 3600 * 1000
  );

  // Fetch candidate posts from DB (simple example, you can optimize with indexes & caching)
  const posts = await Post.find({ createdAt: { $gte: recentThreshold } })
    .lean()
    .exec();

  // Compute scores
  const scoredPosts = posts.map((post) => {
    const tagMatches = post.tags.filter((tag) =>
      likedTags.includes(tag)
    ).length;
    const hoursOld = (now - post.createdAt) / (1000 * 3600);
    const recencyScore = Math.max(0, MAX_RECENCY_HOURS - hoursOld);

    const score =
      TAG_MATCH_WEIGHT * tagMatches +
      RECENCY_WEIGHT * recencyScore +
      LIKE_COUNT_WEIGHT * (post.likeCount || 0);

    return { ...post, score };
  });

  // Sort by score descending
  scoredPosts.sort((a, b) => b.score - a.score);

  // Paginate
  const startIndex = (page - 1) * limit;
  const paginatedPosts = scoredPosts.slice(startIndex, startIndex + limit);

  // Optionally, you can get total count if needed
  const totalPosts = scoredPosts.length;

  return {
    posts: paginatedPosts,
    totalPosts,
    page,
    totalPages: Math.ceil(totalPosts / limit),
  };
};

module.exports = {
  getFeed,
};
