import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const GameControl = () => {
  const [matches, setMatches] = useState({});
  const [selectedType, setSelectedType] = useState("Solo");
  const [loading, setLoading] = useState(true);

  const matchTypes = ["Solo", "Duo", "Squad"];

  // 🟡 Fetch matches from backend
  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/match/all`,{withCredentials:true});
      const matchData = {};
      res.data.forEach((match) => {
        matchData[match.matchType] = match;
      });
      // Fill in default if not available
      matchTypes.forEach((type) => {
        if (!matchData[type]) {
          matchData[type] = {
            matchType: type,
            time: "",
            entryFee: 0,
            prize: 0,
            totalSlots: 0,
            joinedSlots: 0,
          };
        }
      });
      setMatches(matchData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching matches", err);
    }
  };

  useEffect(() => {
    fetchMatches();// eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatches((prev) => ({
      ...prev,
      [selectedType]: {
        ...prev[selectedType],
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    try {
      await axios.post(`${API_URL}/admin/match/update`, matches[selectedType],{withCredentials:true});
      alert(`✅ ${selectedType} match saved successfully`);
    } catch (err) {
      console.error("Save error", err);
      alert("❌ Failed to save match");
    }
  };

  if (loading) return <p>Loading matches...</p>;

  const current = matches[selectedType];
  const remainingSlots = current.totalSlots - current.joinedSlots;

  return (
    <div className="container py-4">
      <h3 className="mb-4">🎮 Tournament Game Control Panel</h3>

      <div className="mb-3">
        <label className="form-label">Select Match Type</label>
        <select
          className="form-select"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          {matchTypes.map((type) => (
            <option key={type} value={type}>{type} Match</option>
          ))}
        </select>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">🕒 Match Time</label>
          <input
            type="datetime-local"
            className="form-control"
            name="time"
            value={current.time?.slice(0, 16) || ""}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">💸 Entry Fee (Rs)</label>
          <input
            type="number"
            className="form-control"
            name="entryFee"
            value={current.entryFee}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">🏆 Prize (Rs)</label>
          <input
            type="number"
            className="form-control"
            name="prize"
            value={current.prize}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">👥 Total Slots</label>
          <input
            type="number"
            className="form-control"
            name="totalSlots"
            value={current.totalSlots}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">🎮 Joined Slots</label>
          <input
            type="number"
            className="form-control"
            name="joinedSlots"
            value={current.joinedSlots}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button className="btn btn-success w-100 mt-3" onClick={handleSave}>
            ✅ Save {selectedType} Match
          </button>
        </div>
      </div>

      {/* Preview Card */}
      <div className="card mt-5 border-dark">
        <div className="card-header bg-dark text-white">
          📢 {selectedType} Match Info
        </div>
        <div className="card-body fs-5">
          <p><strong>🕒 Time:</strong> {new Date(current.time).toLocaleString()}</p>
          <p><strong>💸 Entry Fee:</strong> Rs. {current.entryFee}</p>
          <p><strong>🏆 Prize:</strong> Rs. {current.prize}</p>
          <p><strong>👥 Remaining Slots:</strong> {remainingSlots}/{current.totalSlots}</p>
        </div>
      </div>
    </div>
  );
};

export default GameControl;
