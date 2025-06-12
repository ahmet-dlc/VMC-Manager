// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // We'll create this file next

const Navbar = () => {
    const logout = () => {
        console.log("Logout button clicked");
        localStorage.removeItem("token"); // Clear the token
        window.location.href = "/login"; // Redirect to the login page
    };
    return (
        <nav className="navbar">
            <div className="navbar-title">VMC Manager</div>
            <ul>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/edit-events">Edit Events</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                <li>
                    <button onClick={logout}>Logout</button>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;