const User = require("../models/userModel");

const getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("name email role"); // Select only the basic fields
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user);
    } catch (err) {
        console.error("Error fetching user info:", err);
        res.status(500).json({ error: "Error fetching user info" });
    }
};

module.exports = { getUserInfo };
