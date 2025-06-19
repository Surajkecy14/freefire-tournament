import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const IdPassSend = () => {
  const [matches, setMatches] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState("");
  const [gameId, setGameId] = useState("");
  const [gamePassword, setGamePassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await axios.get(`${API_URL}/admin/match/all`,{withCredentials:true});
        setMatches(res.data);
      } catch (err) {
        console.error("Error fetching matches:", err);
        alert("Failed to load matches");
      }
    };

    fetchMatches();
  }, []);

  // Submit game ID and password
  const handleSubmit = async () => {
    if (!selectedMatch || !gameId || !gamePassword) {
      return alert("Please fill in all fields.");
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/admin/set-idpass`, {
        matchId: selectedMatch,
        gameId,
        gamePassword,
      },{withCredentials:true});

      alert(res.data.message || "Credentials set successfully.");
      // Optional: reset fields
      setGameId("");
      setGamePassword("");
      setSelectedMatch("");
    } catch (err) {
      console.error("Error setting credentials:", err);
      alert(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🔐 Set Game ID & Password</h3>

      <select
        className="form-select mb-3"
        value={selectedMatch}
        onChange={(e) => setSelectedMatch(e.target.value)}
      >
        <option value="">Select Match</option>
        {matches.map((m) => (
          <option key={m._id} value={m._id}>
            {m.matchType} - {new Date(m.time).toLocaleString()}
          </option>
        ))}
      </select>

      <input
        type="text"
        className="form-control mb-2"
        placeholder="Game ID"
        value={gameId}
        onChange={(e) => setGameId(e.target.value)}
      />

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Game Password"
        value={gamePassword}
        onChange={(e) => setGamePassword(e.target.value)}
      />

      <button
        className="btn btn-primary"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Set Credentials"}
      </button>
    </div>
  );
};

export default IdPassSend;



