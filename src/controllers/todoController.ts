import Todo from "../models/todo";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const getTodos = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos" });
  }
};

export const createTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { title } = req.body;
  try {
    const newTodo = new Todo({
      title,
      user: req.user.id,
      completed: false,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo" });
  }
};

export const editTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, completed },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
};

export const deleteTodo = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedTodo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedTodo) {
      res.status(404).json({ message: "Todo not found" });
      return;
    }

    res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
};
