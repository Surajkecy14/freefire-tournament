import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const JoinedTournaments = () => {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchApprovedRequests = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/join-requests`,{withCredentials:true});
      // filter approved only
      const approved = res.data.filter((r) => r.status === "approved");
      setApprovedRequests(approved);
    } catch (error) {
      console.error("Error fetching approved requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedRequests();
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>✅ Approved Join Requests</h2>
        <button
          className="btn btn-outline-dark"
          onClick={fetchApprovedRequests}
          disabled={loading}
        >
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {loading ? (
        <p>Loading approved requests...</p>
      ) : approvedRequests.length === 0 ? (
        <p>No approved requests found.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Slot</th>
              <th>Tournament</th>
              <th>User</th>
              <th>Game Name</th>
              <th>Game ID</th>
              <th>eSewa TxID</th>
              <th>Joined At</th>
            </tr>
          </thead>
          <tbody>
            {approvedRequests.map((r, index) => (
              <tr key={r._id}>
                <td>{index + 1}</td>
                <td>{r.match?.matchType || "N/A"}</td>
                <td>{r.user?.email || "N/A"}</td>
                <td>{r.gameName}</td>
                <td>{r.gameId}</td>
                <td>{r.esewaId}</td>
                <td>{new Date(r.joinedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JoinedTournaments;
