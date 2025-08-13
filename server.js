const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const postRoutes = require("./routes/postRoutes");
const likeRoutes = require("./routes/likeRoutes");
const feedRoutes = require("./routes/feedRoutes");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to DB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/feed", feedRoutes);

app.get("/", (req, res) => {
  res.send("Hello, Infinite Social Feed!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

//PwgA9ixfoQsQJLE5
