import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const JoinRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [finishingMatchId, setFinishingMatchId] = useState("");

  const fetchJoinRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/join-requests`,{withCredentials:true});
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching join requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!window.confirm(`Are you sure to ${status} this request?`)) return;

    try {
      setUpdatingId(id);
      await axios.patch(`${API_URL}/admin/join-requests/${id}/status`, {
        status,
      },{withCredentials:true});
      fetchJoinRequests();
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const finishMatch = async (matchId) => {
    if (!window.confirm("Are you sure you want to finish this match? This will delete all related join requests.")) return;

    try {
      await axios.delete(`${API_URL}/admin/join-requests/match/${matchId}`,{withCredentials:true});
      alert("Match finished and requests deleted successfully.");
      setFinishingMatchId("");
      fetchJoinRequests();
    } catch (err) {
      console.error("Failed to finish match:", err);
      alert("Error finishing match.");
    }
  };

  useEffect(() => {
    fetchJoinRequests();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>📥 All Join Requests</h2>
        <div className="d-flex gap-2">
          <select
            className="form-select"
            style={{ width: "200px" }}
            onChange={(e) => setFinishingMatchId(e.target.value)}
            value={finishingMatchId || ""}
          >
            <option value="">🎯 Select Match</option>
            {[...new Map(requests.map((r) => [r.match?._id, r.match])).values()]
              .filter(Boolean)
              .map((match) => (
                <option key={match._id} value={match._id}>
                  {match.matchType}
                </option>
              ))}
          </select>
          <button
            className="btn btn-outline-danger"
            disabled={!finishingMatchId}
            onClick={() => finishMatch(finishingMatchId)}
          >
            🏁 Finish Match
          </button>
          <button
            className="btn btn-outline-dark"
            onClick={fetchJoinRequests}
            disabled={loading}
          >
            🔄 {loading ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading join requests...</p>
      ) : requests.length === 0 ? (
        <p>No join requests found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>SN.</th>
              <th>Tournament</th>
              <th>User</th>
              <th>Game Name</th>
              <th>Game ID</th>
              <th>eSewa TxID</th>
              <th>Status</th>
              <th>Joined At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r, index) => (
              <tr key={r._id}>
                <td>{index + 1}</td>
                <td>{r.match?.matchType || "N/A"}</td>
                <td>{r.user?.email || "N/A"}</td>
                <td>{r.gameName}</td>
                <td>{r.gameId}</td>
                <td>{r.esewaId}</td>
                <td>
                  <span
                    className={`badge ${
                      r.status === "approved"
                        ? "bg-success"
                        : r.status === "rejected"
                        ? "bg-danger"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td>{new Date(r.joinedAt).toLocaleString()}</td>
                <td>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      disabled={updatingId === r._id || r.status === "approved"}
                      onClick={() => updateStatus(r._id, "approved")}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      disabled={updatingId === r._id || r.status === "rejected"}
                      onClick={() => updateStatus(r._id, "rejected")}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JoinRequests;
