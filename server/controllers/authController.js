import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

/*
  @desc    Register User
  @route   POST /api/auth/register
  @access  Public
*/
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide all required fields");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        currency: user.currency,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Login User
  @route   POST /api/auth/login
  @access  Public
*/
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    await User.findByIdAndUpdate(user._id, {
  lastLogin: new Date(),
});

    res.status(200).json({
      success: true,
      message: "Login successful",
      token: generateToken(user._id),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        currency: user.currency,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Get Logged In User Profile
  @route   GET /api/auth/profile
  @access  Private
*/
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/*
  @desc    Update User Profile
  @route   PUT /api/auth/profile
  @access  Private
*/
export const updateUserProfile = async (req, res, next) => {
  try {
    console.log("BODY:", req.body);
    const { name, avatar, currency } = req.body || {};

    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.currency = currency || user.currency;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        currency: updatedUser.currency,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    next(error);
    
  }
};

/*
  @desc    Change Password
  @route   PUT /api/auth/change-password
  @access  Private
*/
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400);
      throw new Error("Both passwords are required");
    }

    const user = await User.findById(req.user._id).select("+password");

    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      res.status(401);
      throw new Error("Current password is incorrect");
    }

    user.password = newPassword;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};



export const forgotPassword =
  async (req, res, next) => {
    try {
      const { email } = req.body;

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        res.status(404);
        throw new Error(
          "User not found"
        );
      }

      const resetToken =
        crypto
          .randomBytes(32)
          .toString("hex");

      user.resetPasswordToken =
        resetToken;

      user.resetPasswordExpire =
        Date.now() +
        15 * 60 * 1000;

      await user.save();

      const resetUrl =
        `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      const transporter =
        nodemailer.createTransport({
          service: "gmail",
          auth: {
            user:
              process.env.EMAIL_USER,
            pass:
              process.env.EMAIL_PASS,
          },
        });

      await transporter.sendMail({
        from:
          process.env.EMAIL_USER,
        to: user.email,
        subject:
          "BudgetWise Password Reset",
        html: `
          <h2>Password Reset</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${resetUrl}">
            Reset Password
          </a>
          <p>This link expires in 15 minutes.</p>
        `,
      });

      res.json({
        success: true,
        message:
          "Password reset link sent",
      });
    } catch (error) {
      next(error);
    }
  };

  export const resetPassword =
  async (req, res, next) => {
    try {
      const { token } =
        req.params;

      const { password } =
        req.body;

      const user =
        await User.findOne({
          resetPasswordToken:
            token,
          resetPasswordExpire: {
            $gt: Date.now(),
          },
        });

      if (!user) {
        res.status(400);
        throw new Error(
          "Invalid or expired token"
        );
      }

      user.password =
        password;

      user.resetPasswordToken =
        undefined;

      user.resetPasswordExpire =
        undefined;

      await user.save();

      res.json({
        success: true,
        message:
          "Password reset successful",
      });
    } catch (error) {
      next(error);
    }
  };