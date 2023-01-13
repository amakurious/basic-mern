import express from "express";
import {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController";

const router = express.Router();

router.route("/").get(getGoals).post(setGoals);
router.route("/:id").put(updateGoal).delete(deleteGoal);

module.exports = router;
