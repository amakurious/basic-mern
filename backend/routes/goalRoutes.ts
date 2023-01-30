import express from "express";
import {
  getGoals,
  setGoals,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController";
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getGoals).post(protect, setGoals);
router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);

module.exports = router;
