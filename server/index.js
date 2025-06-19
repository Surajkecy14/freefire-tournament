require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_URL, 
  credentials: true,
}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/profile'));
app.use('/admin', require('./routes/admin'));
app.use('/tournament', require('./routes/tournament'));

// Connect to MongoDB and Start Server
mongoose.connect(process.env.MONGO_URL, {
})
.then(() => {
  console.log("✅ MongoDB connected");

  app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
 