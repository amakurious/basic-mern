import { protect } from "./../middleware/authMiddleware";
import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
} from "../controllers/userController";

export const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;
