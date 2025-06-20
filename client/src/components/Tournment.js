import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Tournament = () => {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [esewaTxId, setEsewaTxId] = useState("");
  const [joinLoading, setJoinLoading] = useState(false);

  const fetchUserProfile = async () => {
    try {
      setUserLoading(true);
      const res = await axios.get(`${API_URL}/user/profile`, {
        withCredentials: true,
      });
      setUser(res.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  };

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/match/all`,{withCredentials:true});
      setTournaments(res.data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    fetchTournaments();
  }, []);

  const handleCopyEsewa = () => {
    navigator.clipboard.writeText("9862963770");
    alert("eSewa number copied to clipboard!");
  };

  const handleJoinClick = (tournament) => {
    if (!user) {
      alert("You must be logged in to join.");
      return;
    }
    setSelectedTournament(tournament);
    setEsewaTxId("");
    setShowJoinModal(true);
  };

  const handleSubmitJoin = async () => {
    if (!esewaTxId.trim()) {
      alert("Please enter your eSewa Transaction ID.");
      return;
    }

    setJoinLoading(true);
    try {
      const res = await axios.post(
        `${API_URL}/tournament/join`,
        {
          tournamentId: selectedTournament._id,
          gameName: user.gameName,
          gameId: user.gameId,
          esewaTxId,
        },
        {
          withCredentials: true,
        }
      );

      alert(res.data.message || "Join request submitted!");
      setShowJoinModal(false);
    } catch (error) {
      console.error("Join request error:", error);
      alert(
        error.response?.data?.message || "Failed to submit join request."
      );
    } finally {
      setJoinLoading(false);
    }
  };

  const isSameDay = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const today = new Date();

  const upcomingTournaments = tournaments
    .filter((t) => {
      const time = new Date(t.time);
      const diffInMs = time - today;
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
      return !isNaN(time) && diffInDays >= 0 && diffInDays <= 5;
    })
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  tournaments.filter((t) => {
    const time = new Date(t.time);
    return !isNaN(time) && isSameDay(time, today);
  });

  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        maxWidth: "800px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">🔥 Upcoming Tournaments</h2>
        <button
          onClick={fetchTournaments}
          className="btn btn-outline-dark"
          disabled={loading}
        >
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading || userLoading ? (
        <p className="text-center">Loading...</p>
      ) : upcomingTournaments.length === 0 ? (
        <p className="text-center">No tournaments for today.</p>
      ) : (
        upcomingTournaments.map((t) => {
          const isFull = t.joinedSlots >= t.totalSlots;
          return (
            <div
              key={t._id}
              className="card mb-3 shadow-sm"
              style={{ backgroundColor: "#fff8f1" }}
            >
              <div className="card-body">
                <h5 className="card-title fw-bold">{t.matchType} Match</h5>
                <p className="card-text mb-1">
                  🕒 Time: {new Date(t.time).toLocaleString()}
                </p>
                <p className="card-text mb-1">💸 Entry Fee: Rs. {t.entryFee}</p>
                <p className="card-text mb-1">🏆 Prize: Rs. {t.prize}</p>
                <p className="card-text mb-3">
                  👥Slots Filled: {t.joinedSlots}/{t.totalSlots}
                </p>
                <button
                  className="btn btn-warning fw-bold"
                  disabled={isFull}
                  onClick={() => handleJoinClick(t)}
                >
                  {isFull ? "Full" : "Join Now"}
                </button>
              </div>
            </div>
          );
        })
      )}

      {/* Join Modal */}
      {showJoinModal && selectedTournament && user && (
        <div
          className="modal show fade"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h5 className="modal-title mb-3">
                Join {selectedTournament.matchType} Match
              </h5>

              <p>
                👤 Your Game Name: <strong>{user.gameName}</strong>
              </p>
              <p>
                🆔 Your Game ID: <strong>{user.gameId}</strong>
              </p>

              <p>
                💸 Pay Rs. {selectedTournament.entryFee} to eSewa:{" "}
                <strong>9767271161</strong>{" "}
                <button
                  className="btn btn-sm btn-outline-secondary ms-2"
                  onClick={handleCopyEsewa}
                >
                  Copy
                </button>
              </p>

              <div className="mb-3">
                <label className="form-label">eSewa Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter esewa Number"
                  value={esewaTxId}
                  onChange={(e) => setEsewaTxId(e.target.value)}
                />
              </div>

              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowJoinModal(false)}
                  disabled={joinLoading}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitJoin}
                  disabled={joinLoading}
                >
                  {joinLoading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournament;
