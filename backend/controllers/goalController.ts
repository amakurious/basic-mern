import { Request, Response } from "express";
const asyncHandler = require("express-async-handler");

// @desc     Get goals
// @route    GET /api/goals
// @access   Private
const getGoals = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: "Get goals" });
});

// @desc     Set goals
// @route    POST /api/goals
// @access   Private
const setGoals = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({ message: "Set goals" });
});

// @desc     Update goals
// @route    PUT /api/goals/id
// @access   Private
const updateGoals = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Update goals ${req.params.id}` });
});

// @desc     Delete goals
// @route    DELETE /api/goals/id
// @access   Private
const deleteGoals = asyncHandler(async (req: Request, res: Response) => {
  res.status(200).json({ message: `Delete goals ${req.params.id}` });
});

module.exports = { getGoals, setGoals, updateGoals, deleteGoals };
