import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  dueDate: {
    type: Date,
    default: Date.now(),
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
  },
  progress: {
    type: String,
    enum: ["Todo", "In Progress", "Completed"],
    default: "Todo",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
