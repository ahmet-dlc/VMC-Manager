import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom"; // To redirect after successful login

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(""); // Clear any previous errors

        try {
            const response = await axios.post("http://localhost:3030/api/auth/login", {
                email,
                password,
            });

            // On success, store token in localStorage (or use context/state management)
            localStorage.setItem("token", response.data.token);

            // Redirect user to dashboard or home page after successful login
            history.push("/dashboard");
        } catch (err) {
            setLoading(false);
            setError(err.response ? err.response.data.error : "An error occurred");
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>

            {error && <div className="error">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
