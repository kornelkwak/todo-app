import mongoose, { Document, Schema } from "mongoose";

export interface ITodo extends Document {
  title: string;
  completed: boolean;
}

const TodoSchema: Schema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
