import React, { useEffect, useState } from "react";
import axios from "axios";
import './Profile.css';
import Navbar from "../components/Navbar";

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3030/api/users/me", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUserInfo(response.data); // Set the user info to the state
            } catch (error) {
                console.error("Error fetching user info:", error);
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="profile-page">
            <Navbar />
            <h1>Your Profile</h1>
            {userInfo ? (
                <div className="user-info">
                    <p><strong>Name:</strong> {userInfo.name}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Role:</strong> {userInfo.role}</p>
                </div>
            ) : (
                <p>Loading your profile...</p>
            )}
        </div>
    );
};

export default Profile;
