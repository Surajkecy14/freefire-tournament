const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  matchType: {
    type: String,
    enum: ["Solo", "Duo", "Squad"],
    required: true,
    unique: true,
  },
  time: {
    type: Date,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
  },
  prize: {
    type: Number,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
  },
  joinedSlots: {
    type: Number,
    required: true,
    default: 0,
  },
  slotFullFilled: {
    type: Boolean,
    default: false,
  },
});

// Automatically update slotFullFilled before saving
matchSchema.pre("save", function (next) {
  this.slotFullFilled = this.joinedSlots >= this.totalSlots;
  next();
});

module.exports = mongoose.model("Match", matchSchema);
