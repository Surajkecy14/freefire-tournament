const mongoose = require("mongoose");

const idPassSchema = new mongoose.Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
    unique: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  gamePassword: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("IdPass", idPassSchema);
