import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { NextFunction, Response } from "express";

interface JwtPayload {
  id: string;
}

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // Get token from header
        token = req.headers.authorization.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as JwtPayload;

        // Get user from token
        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);
