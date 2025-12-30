const express = require("express");
const User = require("../models/User");

console.log("Admin routes loaded");

const router = express.Router();

router.get("/ping", (req, res) => {
  res.send("Admin PING OK");
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
