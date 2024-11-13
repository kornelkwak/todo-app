"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.editTodo = exports.createTodo = exports.getTodos = void 0;
const todo_1 = __importDefault(require("../models/todo"));
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todo_1.default.find({ user: req.user.id });
        res.status(200).json(todos);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const newTodo = new todo_1.default({
            title,
            user: req.user.id,
            completed: false,
        });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating todo" });
    }
});
exports.createTodo = createTodo;
const editTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, completed } = req.body;
    try {
        const updatedTodo = yield todo_1.default.findOneAndUpdate({ _id: id, user: req.user.id }, { title, completed }, { new: true });
        if (!updatedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating todo" });
    }
});
exports.editTodo = editTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTodo = yield todo_1.default.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });
        if (!deletedTodo) {
            res.status(404).json({ message: "Todo not found" });
            return;
        }
        res.status(200).json({ message: "Todo deleted successfully", deletedTodo });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting todo" });
    }
});
exports.deleteTodo = deleteTodo;
