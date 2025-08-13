const feedService = require("../services/feedService");

const getFeed = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const feedData = await feedService.getFeed(userId, page, limit);

    res.json({
      message: "Feed fetched successfully",
      data: feedData.posts,
      pagination: {
        totalPosts: feedData.totalPosts,
        page: feedData.page,
        totalPages: feedData.totalPages,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch feed", error: error.message });
  }
};

module.exports = {
  getFeed,
};
