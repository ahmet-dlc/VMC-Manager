const Event = require("../models/eventModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");


const createEvent = async (req, res) => {
    const { title, date, location, description, image } = req.body;

    try {
        const newEvent = new Event({ title, date, location, description, image });
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    } catch (err) {
        console.error("Error creating event:", err);
        res.status(500).json({ error: "Error creating event" });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        console.error("Error fetching events:", err);
        res.status(500).json({ error: "Error fetching events" });
    }
};

const getEventById = async (req, res) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(400).json({ error: "Invalid event ID" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) return res.status(404).json({ error: "Event not found" });

        res.json(event);
    } catch (err) {
        console.error("Error fetching event:", err);
        res.status(500).json({ error: "Error fetching event" });
    }
};

const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const { title, date, location, description, image } = req.body;

    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            { title, date, location, description, image },
            { new: true }
        );

        res.json({ message: "Event updated successfully", event: updatedEvent });
    } catch (err) {
        console.error("Error updating event:", err);
        res.status(500).json({ error: "Error updating event" });
    }
};

const deleteEvent = async (req, res) => {
    const { eventId } = req.params;

    try {
        await Event.findByIdAndDelete(eventId);
        res.json({ message: "Event deleted successfully" });
    } catch (err) {
        console.error("Error deleting event:", err);
        res.status(500).json({ error: "Error deleting event" });
    }
};

const markEventAsAttending = async (req, res) => {
    const { eventId } = req.params;
    const userId = req.user.id; // User ID from the token

    try {
        // Check if the event exists
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Add the event to the user's attendingEvents array
        const user = await User.findById(userId);
        if (!user.attendingEvents.includes(eventId)) {
            user.attendingEvents.push(eventId);
            await user.save();
        }

        res.json({ message: "Event marked as attending" });
    } catch (err) {
        console.error("Error marking event as attending:", err);
        res.status(500).json({ error: "Error marking event as attending" });
    }
};

const getAttendingEvents = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate("attendingEvents");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(user.attendingEvents);
    } catch (err) {
        console.error("Error fetching attending events:", err);
        res.status(500).json({ error: "Error fetching attending events" });
    }
};


module.exports = {getAttendingEvents, markEventAsAttending, createEvent, getEvents, getEventById, updateEvent, deleteEvent };