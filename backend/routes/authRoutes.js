const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/authController");

router.post("/signup", signUp);  // Endpoint to sign up users
router.post("/login", logIn);    // Endpoint to log in users

module.exports = router;
