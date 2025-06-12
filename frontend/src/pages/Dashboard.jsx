// pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import BASE_URL from "../utils/api";

const Dashboard = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/events`);
                setEvents(response.data);
            } catch (err) {
                console.error("Error fetching events:", err);
            }
        };

        fetchEvents();
    }, []);

    const handleAttend = async (eventId) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `http://localhost:3030/api/events/${eventId}/attend`,
                {eventId},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert("Event marked as attending!");
        } catch (err) {
            console.error("Error marking event as attending:", err);
            alert("Failed to mark event as attending");
        }
    };
    return (
        <div className="dashboard">
            <Navbar />
            <div className="main-content">
                <h1>Upcoming Events!</h1>
                <div className="event-cards">
                    {events.map((event) => (
                        <div key={event._id} className="event-card">
                            <img src={event.image} alt={event.title} />
                            <h3>{event.title}</h3>
                            <p>{new Date(event.date).toLocaleDateString()}</p>
                            <p>{event.location}</p>
                            <p>Attendees: {event.attendeesCount || 0}</p>
                            <button className="attend-button" onClick={() => handleAttend(event._id)}>Attend</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;