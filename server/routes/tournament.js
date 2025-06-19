const express = require("express");
const router = express.Router();
const JoinRequest = require("../models/JoinRequest");
const User = require("../models/User"); // Make sure you have this
const isLogin = require("../middleware/isLogin");

router.post("/join", isLogin, async (req, res) => {
  const { tournamentId, gameName, gameId, esewaTxId } = req.body;
  const userEmail = req.user?.email;

  

  if (!userEmail || !tournamentId || !gameName || !gameId || !esewaTxId) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Step 1: Find the user from the token email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Check for existing join request
    const existingRequest = await JoinRequest.findOne({
      user: user._id,
      match: tournamentId,
    });

    if (existingRequest) {
      return res.status(409).json({
        message: "You have already submitted a join request for this tournament.",
      });
    }

    // Step 3: Create a new join request
    const newJoin = new JoinRequest({
      user: user._id,
      match: tournamentId,
      gameName,
      gameId,
      esewaId: esewaTxId,
    });

    await newJoin.save();
    res.json({ message: "Join request submitted successfully." });

  } catch (err) {
    console.error("Error saving join request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
