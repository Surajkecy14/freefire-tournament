# 🔥 Free Fire Tournament Web App

A full-featured web application for hosting and managing Free Fire tournaments. Users can browse matches, join tournaments by submitting eSewa payments, and view match details like game ID and password once approved. Built with the **MERN stack**.

## 🚀 Features

- 🏆 List upcoming Free Fire matches
- ✅ User join requests with game name, ID, and eSewa ID
- 🔐 Admin panel to set game ID and password
- 👀 Users see match credentials after approval
- 🔄 Real-time status updates for join requests
- 🔗 Authentication and protected routes

## 🌐 Live Demo

👉 [Visit Website](https://freefire-tournament.onrender.com)

## 🛠️ Tech Stack

- **Frontend**: React.js, Axios, React Router, Bootstrap
- **State Management**: Zustand (optional)
- **Backend**: Express.js, MongoDB, Mongoose, Node.js
- **Authentication**: JWT
- **Database**: MongoDB Atlas
- **Deployment**: Render.com

## 📂 Project Structure

├── src/
│ ├── components/
│ ├── pages/
│ ├── MyMatch.jsx
│ ├── JoinMatch.jsx
│ └── App.js
server/
├── models/
│ ├── Match.js
│ ├── JoinRequest.js
│ └── User.js
├── routes/
│ ├── matchRoutes.js
│ ├── userRoutes.js
│ └── joinRoutes.js
├── controllers/
├── server.js
