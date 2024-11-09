import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from './routes/authRoutes';
import todoRoutes from './routes/todoRoutes';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

//database
mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

app.get("/", (req, res) => {
  res.send("Hello, Todo App!");
});

//routes
app.use('/api/auth', authRoutes);
app.use('/api', todoRoutes);

//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


