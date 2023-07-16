import { Router } from "express";

const router = Router();
import {
  getTasks,
  setTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

router.route("/").get(getTasks).post(setTask);

router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
