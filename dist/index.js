"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
dotenv_1.default.config();
//database
mongoose_1.default
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
app.use('/api/auth', authRoutes_1.default);
app.use('/api', todoRoutes_1.default);
//server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
