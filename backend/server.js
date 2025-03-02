const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/connection");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB();

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
    res.send("VMC Manager API is Running");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});