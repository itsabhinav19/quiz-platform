const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

app.set("trust proxy", 1);

const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,               // 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
});

//app.use("/api/", limiter);
app.use(limiter);

app.use(cors({
  origin: [
    "http://localhost:5173",          // local dev
    "https://quiz-platform-three-lemon.vercel.app/" // frontend URL
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

app.use("/api/admin", adminRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});