const express = require("express");
const router = express.Router();
const { createEvent, getEvents } = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createEvent);  // Create an event (protected route)
router.get("/", getEvents);                          // Get all events

module.exports = router;
