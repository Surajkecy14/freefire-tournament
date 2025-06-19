// components/AdminPanel/AllUsers.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setMessage("Refreshing user list...");
      const res = await axios.get(`${API_URL}/admin/users`,{withCredentials:true});
      setUsers(res.data);
      setMessage(`Total users: ${res.data.length}`);
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  // Run once on load
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">All Registered Users</h2>
        <button
          onClick={fetchUsers}
          className="btn btn-outline-primary"
          disabled={loading}
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {message && (
        <div
          className={`alert ${
            loading ? "alert-info" : "alert-success"
          } py-2`}
        >
          {message}
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="table-dark text-center">
            <tr>
              <th>SN.</th>
              <th>Game Name</th>
              <th>Game ID</th>
              <th>Email</th>
              <th>eSewa ID</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.gameName || "-"}</td>
                  <td>{user.gameId || "-"}</td>
                  <td>{user.email || "-"}</td>
                  <td>{user.esewaNumber || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
