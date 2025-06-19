require('dotenv').config();
const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(cors({
  origin: process.env.FRONTEND_URL, // or your frontend URL
  credentials: true,
}));

app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/profile'));
app.use("/admin", require("./routes/admin"));
app.use("/tournament", require("./routes/tournament"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
