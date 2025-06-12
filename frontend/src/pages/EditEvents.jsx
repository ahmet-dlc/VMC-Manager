import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './EditEvents.css'; // Ensure this file exists
import Navbar from "../components/Navbar";
import BASE_URL from "../utils/api";

const EditEvents = () => {
    const { eventId } = useParams(); // Get eventId from URL (for editing)
    const [events, setEvents] = useState([]); // List of all events
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // For search functionality
    const navigate = useNavigate();

    // Fetch all events
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/events`);
                setEvents(response.data);
            } catch (err) {
                console.error("Error fetching events:", err);
                setError("Failed to fetch events");
            }
        };
        fetchEvents();
    }, []);

    // Fetch event details if editing
    useEffect(() => {
        if (eventId) {
            const fetchEvent = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/events/${eventId}`);
                    const event = response.data;
                    setTitle(event.title);
                    setDate(event.date);
                    setLocation(event.location);
                    setDescription(event.description);
                    setImage(event.image);
                } catch (err) {
                    console.error("Error fetching event:", err);
                    setError("Failed to fetch event details");
                }
            };
            fetchEvent();
        }
    }, [eventId]);

    // Handle form submission (create or update event)
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const token = localStorage.getItem("token");
            if (eventId) {
                // Update existing event
                await axios.put(
                    `${BASE_URL}/events/${eventId}`,
                    { title, date, location, description, image },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Event updated successfully!");
            } else {
                // Create new event
                await axios.post(
                    `${BASE_URL}/events/create`,
                    { title, date, location, description, image },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                alert("Event created successfully!");
            }
            navigate("/edit-events"); // Redirect to the events list after success
        } catch (err) {
            console.error("Error saving event:", err);
            setError(err.response?.data?.error || "Failed to save event");
        }
    };

    // Handle event deletion
    const handleDelete = async (eventId) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`${BASE_URL}/events/${eventId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                alert("Event deleted successfully!");
                setEvents(events.filter((event) => event._id !== eventId)); // Remove deleted event from the list
            } catch (err) {
                console.error("Error deleting event:", err);
                setError("Failed to delete event");
            }
        }
    };

    // Filter events based on search query
    const filteredEvents = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="edit-events-page">
            <Navbar />
            <div className="edit-events-container">
                <h2>{eventId ? "Edit Event" : "Add Event"}</h2>
                {error && <p className="error">{error}</p>}

                {/* Event List */}
                <div className="event-list">
                    <h3>All Events</h3>
                    <input
                        type="text"
                        placeholder="Search events..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-bar"
                    />
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredEvents.map((event) => (
                                <tr key={event._id}>
                                    <td>{event.title}</td>
                                    <td>{new Date(event.date).toLocaleDateString()}</td>
                                    <td>{event.location}</td>
                                    <td>
                                        <button
                                            className="edit-button"
                                            onClick={() => navigate(`/edit-events/${event._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() => handleDelete(event._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Event Form */}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title:</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Description:</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Image URL:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">
                        {eventId ? "Update Event" : "Add Event"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditEvents;