const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getUserInfo } = require("../controllers/userController");

router.get("/me", authMiddleware, getUserInfo); // 'me' will fetch the logged-in user's info

module.exports = router;
