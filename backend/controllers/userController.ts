import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/userModel";

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// @desc     Register new user
// @route    POST /api/signup
// @access   Public
export const registerUser = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
);

// @desc     Authenticate a user
// @route    POST /api/users/login
// @access   Public
export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc     Get user data
// @route    GET /api/users
// @access   Public
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(200).json(users);
});

// @desc     Get all user data
// @route    GET /api/users/me
// @access   Private
export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const { _id, name, email }: any = await User.findById(req.body.user.id);

  res.status(200).json({
    id: _id,
    name,
    email,
  });
});
