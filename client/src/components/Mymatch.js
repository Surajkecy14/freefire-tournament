import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const MyMatch = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMyMatches = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/user/my-approved-requests`, {
        withCredentials: true,
      });
      setMatches(res.data);
    } catch (err) {
      console.error("Failed to fetch my matches:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyMatches();
  }, []);

  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{
        background: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
        maxWidth: "800px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🎮 My Approved Matches</h2>
        <button
          className="btn btn-outline-dark"
          onClick={fetchMyMatches}
          disabled={loading}
        >
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : matches.length === 0 ? (
        <p className="text-center">No approved matches yet.</p>
      ) : (
        matches.map((item, index) => {
          const match = item.match;
          const matchTime = new Date(match.time);
          const now = new Date();
          const matchEndTime = new Date(matchTime.getTime() + 30 * 60000);

          let statusLabel = "";
          let statusClass = "";

          if (now < matchTime) {
            statusLabel = "🕓 Upcoming";
            statusClass = "text-primary";
          } else if (now >= matchTime && now <= matchEndTime) {
            statusLabel = "🎮 Game Ongoing";
            statusClass = "text-warning";
          } else {
            statusLabel = "✅ Match Finished";
            statusClass = "text-success";
          }

          return (
            <div
              key={item._id || index}
              className="card mb-3 shadow-sm"
              style={{ backgroundColor: "#fefefe" }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold">
                  {match?.matchType || "Match"} Match
                </h5>
                <p className="card-text mb-1">
                  🕒 Time: {matchTime.toLocaleString()}
                </p>
                <p className="card-text mb-1">
                  💰 Entry Fee: Rs. {match.entryFee}
                </p>
                <p className="card-text mb-1">🏆 Prize: Rs. {match.prize}</p>
                <p className={`card-text mb-2 fw-semibold ${statusClass}`}>
                  {statusLabel}
                </p>

                {/* ✅ Show real Game ID and Password */}
                <p className="card-text mb-1 d-flex align-items-center">
                  🆔 Room ID:{" "}
                  <strong className="ms-2 me-2">
                    {match?.idPass?.gameId || "Not set yet"}
                  </strong>
                  {match?.idPass?.gameId && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => {
                        navigator.clipboard.writeText(match.idPass.gameId);
                        alert("Room ID copied!");
                      }}
                    >
                      Copy
                    </button>
                  )}
                </p>

                <p className="card-text">
                  🔒 Password: {match?.idPass?.gamePassword || "Not set yet"}
                </p>
                <p className="card-text mb-0">
                  🎯 Your Slot Number:{" "}
                  {item?.slotNumber ? (
                    <strong className="text-success">{item.slotNumber}</strong>
                  ) : (
                    <span className="text-muted">Not assigned</span>
                  )}
                </p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MyMatch;
