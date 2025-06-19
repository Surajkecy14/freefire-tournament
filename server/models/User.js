const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    gameName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    gameId: {
      type: String,
      required: true,
    },
    esewaNumber: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", userSchema); 
