const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Match = require("../models/Match");
const JoinRequest = require("../models/JoinRequest");
const isLogin = require("../middleware/isLogin");
const IdPass = require("../models/IdPass");
const isAdmin = require("../middleware/isAdmin");

// GET all users
router.get("/users", isAdmin, async (req, res) => {
  try {
    const users = await User.find({}, "gameName gameId email esewaNumber");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// Save or update match by matchType
router.post("/match/update", isAdmin, async (req, res) => {
  const { matchType, time, entryFee, prize, totalSlots, joinedSlots } = req.body;

  try {
    const updatedMatch = await Match.findOneAndUpdate(
      { matchType },
      { time, entryFee, prize, totalSlots, joinedSlots },
      { upsert: true, new: true }
    );
    res.json({ success: true, message: "Match updated", match: updatedMatch });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating match", error });
  }
});

// Get all match details
router.get("/match/all", isLogin, async (req, res) => {
  try {
    const matches = await Match.find();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Error fetching matches", error });
  }
});

// Admin route to get all join requests
router.get("/join-requests", isAdmin, async (req, res) => {
  try {
    const requests = await JoinRequest.find()
      .populate("user", "email gameName gameId")
      .populate("match", "matchType time");
    res.json(requests);
  } catch (err) {
    console.error("Error fetching join requests:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// PATCH join request status
router.patch("/join-requests/:id/status", isAdmin, async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const joinRequest = await JoinRequest.findById(id);
    if (!joinRequest) return res.status(404).json({ message: "Join request not found." });

    const match = await Match.findById(joinRequest.match);
    if (!match) return res.status(404).json({ message: "Match not found." });

    if (status === "approved") {
      const approvedCount = await JoinRequest.countDocuments({ match: match._id, status: "approved" });

      if (approvedCount >= match.totalSlots) {
        return res.status(400).json({ message: "All slots are already filled for this match." });
      }

      const maxSlot = await JoinRequest.find({ match: match._id, status: "approved" })
        .sort({ slotNumber: -1 })
        .limit(1)
        .then((res) => (res.length ? res[0].slotNumber : 0));

      joinRequest.slotNumber = maxSlot + 1;
      joinRequest.status = "approved";
      await joinRequest.save();

      match.joinedSlots = approvedCount + 1;
      match.slotFullFilled = match.joinedSlots >= match.totalSlots;
      await match.save();
    } else {
      joinRequest.slotNumber = undefined;
      joinRequest.status = "rejected";
      await joinRequest.save();
    }

    res.json({ message: "Status updated successfully.", updated: joinRequest });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE all join requests for a match
router.delete("/join-requests/match/:matchId", isAdmin, async (req, res) => {
  try {
    const { matchId } = req.params;
    const result = await JoinRequest.deleteMany({ match: matchId });
    res.status(200).json({ message: "All join requests deleted for the match.", deletedCount: result.deletedCount });
  } catch (error) {
    console.error("❌ Failed to delete join requests:", error);
    res.status(500).json({ message: "Server error while deleting join requests." });
  }
});

// Set ID and password
router.post("/set-idpass", isAdmin, async (req, res) => {
  const { matchId, gameId, gamePassword } = req.body;

  if (!matchId || !gameId || !gamePassword) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const match = await Match.findById(matchId);
    if (!match) {
      return res.status(404).json({ message: "Match not found." });
    }

    const updated = await IdPass.findOneAndUpdate(
      { match: matchId },
      { gameId, gamePassword },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json({ message: "ID and Password saved successfully", idPass: updated });
  } catch (err) {
    console.error("Error saving ID & Password:", err);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;
