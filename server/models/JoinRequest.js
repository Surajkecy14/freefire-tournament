const mongoose = require("mongoose");

const joinRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  esewaId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  slotNumber: {
    type: Number,
    default: null, // null means slot not yet assigned
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("JoinRequest", joinRequestSchema);
