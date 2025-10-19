import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookieOptions } from "../config/cookieOptions.js";

export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        if(!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, cookieOptions);
        return res.status(201).json({ message: "User registered successfully", 
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            },
            token });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if(!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, cookieOptions);
        return res.status(200).json({ message: "User logged in successfully", 
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
            },
            token });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
}

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
}
