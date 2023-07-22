import { Router } from "express";

const router = Router();
import {
  getTasks,
  setTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import validateToken from "../middleware/validateTokenHandler.js";

router.use(validateToken);
router.route("/").get(getTasks).post(setTask);

router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
