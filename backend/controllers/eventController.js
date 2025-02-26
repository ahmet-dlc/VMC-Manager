const Event = require("../models/eventModel");

const createEvent = async (req, res) => {
    const { title, date, location, description } = req.body;

    try {
        const newEvent = new Event({ title, date, location, description });
        await newEvent.save();
        res.status(201).json({ message: "Event created successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error creating event" });
    }
};

const getEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: "Error fetching events" });
    }
};

module.exports = { createEvent, getEvents };
