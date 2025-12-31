// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const authRoutes = require("./routes/auth");
// const adminRoutes = require("./routes/admin");
// const PORT = process.env.PORT || 5000;
// require("dotenv").config();

// const app = express();

// app.set("trust proxy", 1);

// const rateLimit = require("express-rate-limit");
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,               // 100 requests per IP
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// //app.use("/api/", limiter);
// app.use(limiter);

// app.use(cors({
//   origin: [
//     "http://localhost:5173",          // local dev
//     "https://quiz-platform-three-lemon.vercel.app/" // frontend URL
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

// app.use(express.json());

// app.use("/api/admin", adminRoutes);
// app.use("/api/auth", authRoutes);

// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log(err));


// app.get("/", (req, res) => {
//   res.send("Backend is running 🚀");
// });

// // app.listen(5000, () => {
// //   console.log("Server running on http://localhost:5000");
// // });
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;

app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

app.use(
  cors({
    origin: [
      "http://localhost:3000", // React (CRA / Next)
      //"http://localhost:5173", // Vite
      "https://quiz-platform-three-lemon.vercel.app/", // deployed frontend
    ],
     methods: ["GET", "POST", "PUT", "DELETE"],
    //methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    //allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/admin/ping", (req, res) => {
  res.json({ message: "Admin PING OK" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Mongo Error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
