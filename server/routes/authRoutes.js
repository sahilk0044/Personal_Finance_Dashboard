import express from "express";

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
} from "../controllers/authController.js";

import { protect } from "../middlewares/authMiddleware.js";

const authrouter = express.Router();

// Public Routes
authrouter.post("/register", registerUser);
authrouter.post("/login", loginUser);

// Private Routes
authrouter.get("/profile", protect, getUserProfile);
authrouter.put("/profile", protect, updateUserProfile);
authrouter.put("/change-password", protect, changePassword);

export default authrouter;