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
exports.deleteUser = exports.userLogin = exports.userRegister = void 0;
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield user_1.default.findOne({ email });
        if (user) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        user = new user_1.default({ email, password });
        yield user.save();
        res.status(201).json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.userRegister = userRegister;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({ token, message: "User logged in" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.userLogin = userLogin;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // `req.user.id` is added by the `authMiddleware` after verifying the token
        const userId = req.user.id;
        const deletedUser = yield user_1.default.findByIdAndDelete(userId);
        if (!deletedUser) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ message: "User account deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting user" });
    }
});
exports.deleteUser = deleteUser;
