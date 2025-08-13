const userService = require("../services/userService");

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await userService.registerUser({
      username,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const { user, token } = await userService.loginUser({ email, password });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logout successful" });
};

const User = require("../models/User");

const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Please log in or sign up to access profile" });
    }

    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Profile fetched successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
