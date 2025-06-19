require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const isLogin = require("../middleware/isLogin");

// Create new user
router.post("/create", async (req, res) => {
  const { gameName, email, gameId, esewaNumber, password } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    await User.create({
      gameName,
      email,
      gameId,
      esewaNumber,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "i am hitted but i cant work suraj" });
  }
});

// Login (supports admin + user)
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Admin login check
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASS) {
    const token = jwt.sign({ email, role: "admin" }, process.env.ADMIN_JWT_CODE);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite:"none",
      secure:true
    });

    return res.status(201).json({
      message: "Welcome Admin!",
    });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email or password is incorrect" });
    }
   
    // Compare password hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Email or password is incorrect" });
    }

    // Sign JWT token for user with role user
    const token = jwt.sign(
      { email, role: "user" },
      process.env.JWT_SECRET
    );

    // Set token cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite:"none",
      secure:true
    });

    res.status(200).json({
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
});

// Logout route - clears token cookie
router.post("/logout", isLogin, (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite:"none",
      secure:true
  });
  res.status(200).json({ message: "Logout successful" });
});

module.exports = router;
