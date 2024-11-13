import User from "../models/user";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export const deleteUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user" });
  }
};

export const editUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  const { email, password } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { email, password },
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user" });
  }
};

export const getUser = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await User.find({ user: req.user.id });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "User not found" });
  }
};
