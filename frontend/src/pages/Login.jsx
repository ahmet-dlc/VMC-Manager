import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Login.css';
import BASE_URL from "../utils/api";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password,
            });

            // Save token to localStorage
            localStorage.setItem("token", response.data.token);

            console.log("Login Success:", response.data);
            alert("Login successful!"); 
            navigate("/dashboard"); // Redirect to dashboard after login (you can change this)
        } catch (err) {
            setError(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h2>VMC Manager</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label>Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <p className="mt-3">Don't have an account? <a href="/signup">Sign up here</a></p>
            </div>
        </div>
    );
};

export default Login;
