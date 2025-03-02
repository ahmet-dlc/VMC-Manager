const express = require("express");
const router = express.Router();
const { createEvent, getEvents, getEventById, updateEvent, deleteEvent, markEventAsAttending, getAttendingEvents} = require("../controllers/eventController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/create", authMiddleware, createEvent);
router.get("/", getEvents);
router.get("/:eventId", getEventById);
router.put("/:eventId", authMiddleware, updateEvent);
router.delete("/:eventId", authMiddleware, deleteEvent);
router.post("/:eventId/attend", authMiddleware, markEventAsAttending);
router.get("/attending", authMiddleware, getAttendingEvents);


module.exports = router;