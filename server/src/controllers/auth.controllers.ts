import { Request, Response } from "express";
import { User } from "../models/user.models";
import jwt from "jsonwebtoken";

// register a new user
const registerUser = async (req: Request, res: Response) => {
  try {
    // validation
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    // val 2
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }

    // prevent duplicate email reg
    if (await User.findOne({ email: email.toLowerCase() })) {
      return res.status(400).json({
        message: "email already registered",
      });
    }

    // create user
    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password,
    });

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        id: user._id,
      },
      secret,
      {
        expiresIn: "1h",
      },
    );
    return res.status(201).json({
      message: "user created successfully",
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Register error:", error)
    return res.status(500).json({
      message: "internal server error: ",
      error,
    });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    // validation
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret) {
      throw new Error("JWT_SECRET_KEY is not defined in environment variables");
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "all fields required",
      });
    }

    // to check if registered
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({
        message: "email not registered",
      });
    }

    // compare provided password with the hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({
        message: "incorrect password",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        username: user.username,
        id: user._id,
      },
      secret,
      {
        expiresIn: "1h",
      },
    );

    const refreshToken = jwt.sign({ id: user._id }, secret, {
      expiresIn: "7d",
    });

    // since password is okay , login user
    return res.status(200).json({
      message: "sucessful login",
      token,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      error,
    });
  }
};

const logoutUser = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ message: "user logged out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};

export { registerUser, loginUser, logoutUser };
