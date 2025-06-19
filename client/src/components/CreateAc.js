import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const Register = () => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gameId, setGameId] = useState("");
  const [esewaNumber, setEsewaNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/create`, {
        gameName,
        gameId,
        email,
        password,
        esewaNumber,
      });
      if (response.status === 201) {
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("server side error!");
      }
    }
  };

  return (
    <div
      className="container mt-1 p-4 rounded shadow-lg"
      style={{
        background: "linear-gradient(135deg, #43cea2, #185a9d)",
        color: "white",
        maxWidth: "550px",
      }}
    >
      <h2 className="mb-4 fw-bold text-center">Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Game Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your game name"
            name="gameName"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
            }}
            required
            minLength={3}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Game ID</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your game ID"
            name="gameId"
            value={gameId}
            onChange={(e) => {
              setGameId(e.target.value);
            }}
            required
            minLength={7}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter a password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            minLength={6}
          />
        </div>

        <div className="mb-4">
          <label className="form-label fw-semibold">eSewa Number</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your eSewa number"
            name="esewa"
            value={esewaNumber}
            onChange={(e) => {
              setEsewaNumber(e.target.value);
            }}
            required
            minLength={10}
            maxLength={10}
          />
        </div>

        <button type="submit" className="btn btn-light fw-bold w-100">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Register;
