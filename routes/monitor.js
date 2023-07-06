const express = require("express");
const jwt = require("jsonwebtoken");
const Monitor = require("../models/Monitor");

const router = express.Router();

// Create a new monitor
router.post("/monitors", verifyToken, async (req, res) => {
  try {
    const { url } = req.body;

    // Extract user ID from the token
    const userId = req.user.userId;

    // Create a new monitor for the user
    const newMonitor = new Monitor({
      user: userId,
      url,
      isPaused: false,
    });

    // Save the monitor to the database
    await newMonitor.save();

    res.status(201).json({ message: "Monitor created successfully" });
  } catch (error) {
    console.error("Error creating monitor:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Delete a monitor
router.delete("/monitors/:id", verifyToken, async (req, res) => {
  try {
    const monitorId = req.params.id;

    // Extract user ID from the token
    const userId = req.user.userId;

    // Find the monitor and ensure it belongs to the user
    const monitor = await Monitor.findOne({ _id: monitorId, user: userId });
    if (!monitor) {
      return res.status(404).json({ error: "Monitor not found" });
    }

    // Delete the monitor
    await monitor.remove();

    res.status(200).json({ message: "Monitor deleted successfully" });
  } catch (error) {
    console.error("Error deleting monitor:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Fetch all monitors for the user
router.get("/monitors", verifyToken, async (req, res) => {
  try {
    // Extract user ID from the token
    const userId = req.user.userId;

    // Find all monitors belonging to the user
    const monitors = await Monitor.find({ user: userId });

    res.status(200).json({ monitors });
  } catch (error) {
    console.error("Error fetching monitors:", error);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

// Middleware function to verify the JWT token
function verifyToken(req, res, next) {
    const token = req.body.token;
  
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized" });
      }
  
      req.user = decoded;
      next();
    });
  }

module.exports = router;
