import User from "../models/auth.model.js";
import generate from "../utils/genToken.js";
import jwt from "jsonwebtoken";
//  signup controller:
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // all fields are required:
    if (!(userName && email && password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // email already exist:
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        message: "User already exist with this email",
      });
    }

    // create user
    const newUser = await User.create({
      userName,
      email,
      password,
    });

    // remove password filed before sending:
    const { password: pwd, ...userData } = newUser.toObject();

    return res
      .status(201)
      .cookie("accessToken", generate.accessToken(newUser._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", generate.refreshToken(newUser._id), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User created successfully",
        user: userData,
      });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// sign in controller:
export const signin = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;

    // all fields are required:
    if (!(email && password)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    //  find email:
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
      });
    }

    // remove password:
    const { password: pwd, ...userData } = user.toObject();

    //  match password and sign in:
    if (await user.comparePassword(password)) {
      return res
        .status(200)
        .cookie("accessToken", generate.accessToken(user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1 * 60 * 60 * 1000,
        })
        .cookie("refreshToken", generate.refreshToken(user._id), {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .json({
          message: "Sign in successfully",
          data: userData,
        });
    } else {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// refresh token controller, this controller execute when access token expired:

export const refreshToken = async (req, res, next) => {
  // if token is in cookies || if token is sent in body
  const token = req.cookies.refreshToken || req.body?.refreshToken;
  if (!token) {
    return res.status(401).json({
      message: "Token is missing",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return res
      .status(200)
      .cookie("accessToken", generate.accessToken(decoded._id), {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 60 * 60 * 1000,
      })
      .json({
        message: "Access token generate",
        data: decoded._id,
      });
  } catch (err) {
    return res.status(403).json({
      message: "Invalid token",
    });
  }
};
