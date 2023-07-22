import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import validateToken from "../middleware/validateTokenHandler.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/current", validateToken, currentUser);

export default router;
