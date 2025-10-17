
export const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ 
            message: "User profile fetched successfully", 
            user: req.user 
        });
    } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error",
            error: error.message
        });
    }
}