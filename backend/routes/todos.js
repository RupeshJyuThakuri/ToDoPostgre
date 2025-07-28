import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  todoCompletion,
  deleteTodo,
} from "../controllers/todoController.js";

import isauthenticated from "../middleware/auth.js";

const router = express.Router();

// Only authenticated users can access these
router.get("/", isauthenticated, getTodos);
router.post("/", isauthenticated, createTodo);
router.put("/:id", isauthenticated, updateTodo);
router.patch("/:id", isauthenticated, todoCompletion);
router.delete("/:id", isauthenticated, deleteTodo);

export default router;
