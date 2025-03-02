import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css'; 

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            const res = await axios.post("http://localhost:3030/api/auth/signup", { name, email, password });
            setMessage(res.data.message);
            alert("Signup successful! Redirecting to login...");
            navigate("/login"); // Redirect to login after successful signup
        } catch (err) {
            setError(err.response?.data?.error || "Signup failed");
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <h2>Signup</h2>
                {message && <p className="alert alert-success">{message}</p>}
                {error && <p className="alert alert-danger">{error}</p>}
                <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                </form>
                <p className="mt-3">Already have an account? <a href="/login">Login here</a></p>
            </div>
        </div>
    );
};

export default Signup;
