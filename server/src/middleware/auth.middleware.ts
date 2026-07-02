import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models";

export const protectRoute = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization || " ";
    const token = authHeader && authHeader.split(" ")[1];
    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as {
      id?: string;
      userId?: string;
    };

    const userId = decoded.id ?? decoded.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;
    console.log("user authenticated: ", user);
    next();
  } catch (err) {
    console.error(
      "Error in the protect middleware (auth.middleware.ts) :",
      err,
    );
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "invalid token",
      });
    }

    res.status(500).json({
      message: "internal server error",
    });
  }
};
