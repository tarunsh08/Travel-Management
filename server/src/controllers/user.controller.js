import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.cookies.userId);
        if(!user) {
            return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User profile fetched successfully", user });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
}