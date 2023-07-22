import Task from "../models/taskModel.js";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user_id: req.user.id });
  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;
  if (!title) {
    res.status(400).json({ message: "Title is required" });
  }
  const task = await Task.create({
    user_id: req.user.id,
    title,
    description,
    dueDate,
    priority,
    completed,
  });
  res.status(201).json(task);
});

const getTaskById = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Invalid ID" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Invalid ID" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }

  const updatedTask = await Task.findByIdAndUpdate(taskId, req.body, {
    new: true,
  });
  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res, next) => {
  const taskId = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Invalid ID" });
  }

  const task = await Task.findById(taskId);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne({
    _id: taskId,
  });
  res.status(200).json({ message: "Task deleted successfully" });
});

export { getTasks, setTask, getTaskById, updateTask, deleteTask };
