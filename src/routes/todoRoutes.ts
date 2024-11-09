import { Router } from "express";
import { getTodos, createTodo, editTodo, deleteTodo } from "../controllers/todoController";
import {
  authMiddleware,
} from "../middleware/authMiddleware";


const router = Router();

router.get(
  "/todos",
  authMiddleware,
  getTodos
);

router.post(
  "/todos",
  authMiddleware,
  createTodo
);

router.put(
  "/todos/:id",
  authMiddleware,
  editTodo
);

router.delete(
  "/todos/:id",
  authMiddleware,
  deleteTodo
);

export default router;
