import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel";

// @desc     Get goals
// @route    GET /api/goals
// @access   Private
export const getGoals = asyncHandler(async (req: Request, res: Response) => {
  const goals = await Goal.find();

  res.status(200).json(goals);
});

// @desc     Set goals
// @route    POST /api/goals
// @access   Private
export const setGoals = asyncHandler(async (req: Request, res: Response) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});

// @desc     Update goals
// @route    PUT /api/goals/id
// @access   Private
export const updateGoal = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

// @desc     Delete goals
// @route    DELETE /api/goals/id
// @access   Private
export const deleteGoal = asyncHandler(async (req: Request, res: Response) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  // const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
  // res.status(200).json(deletedGoal);

  await goal.remove();
  res.status(200).json({ id: req.params.id });
});

// module.exports = { getGoals, setGoals, updateGoal, deleteGoal };
