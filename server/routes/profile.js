const express = require("express");
const router = express.Router();
const User = require("../models/User");
const JoinRequest = require("../models/JoinRequest");
const IdPass = require("../models/IdPass");  // <-- import IdPass model
const isLogin = require("../middleware/isLogin");

// 🔐 GET user profile
router.get("/profile", isLogin, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({ message: "User data collected successfully.", user });
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// ✏️ POST update profile
router.post("/edit", isLogin, async (req, res) => {
  try {
    const { gameName, gameId, esewaNumber } = req.body;
    const updated = await User.findOneAndUpdate(
      { email: req.user.email },
      { gameName, gameId, esewaNumber },
      { new: true }
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "Profile updated successfully.", user: updated });
  } catch (err) {
    console.error("❌ Error updating profile:", err);
    res.status(500).json({ message: "Failed to update profile." });
  }
});

// 🎮 GET approved join requests for this user with Room ID & Password
router.get("/my-approved-requests", isLogin, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all approved join requests with populated match info
    const approvedRequests = await JoinRequest.find({
      user: user._id,
      status: "approved",
    })
      .populate({
        path: "match",
        select: "matchType time entryFee prize", // select only needed fields
      })
      .lean();

    // For each request, fetch the IdPass for that match and append to match object
    for (const reqItem of approvedRequests) {
      if (reqItem.match && reqItem.match._id) {
        const idPassDoc = await IdPass.findOne({ match: reqItem.match._id }).lean();
        if (idPassDoc) {
          reqItem.match.idPass = {
            gameId: idPassDoc.gameId,
            gamePassword: idPassDoc.gamePassword,
          };
        } else {
          reqItem.match.idPass = null;
        }
      } else {
        reqItem.match.idPass = null;
      }
    }

    res.json(approvedRequests);
  } catch (error) {
    console.error("Error fetching approved matches:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
