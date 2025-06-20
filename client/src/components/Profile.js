import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

const Profile = () => {
  const navigate = useNavigate();
  const [gameName, setGameName] = useState("");
  const [email, setEmail] = useState("");
  const [gameId, setGameId] = useState("");
  const [esewaNumber, setEsewaNumber] = useState("");

  const [loadingUser, setLoadingUser] = useState(true); // ✅ for initial load blur
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false); // ✅ for modal saving blur

  const [formData, setFormData] = useState({
    gameName: "",
    gameId: "",
    esewaNumber: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/user/profile`, {
          withCredentials: true,
        });
        const user = response.data.user;
        setEmail(user.email);
        setGameName(user.gameName);
        setGameId(user.gameId);
        setEsewaNumber(user.esewaNumber);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          alert("Server error");
        }
      } finally {
        setLoadingUser(false); // ✅ hide blur after load
      }
    };
    fetchData();
  }, [navigate]);

  const openModal = () => {
    setFormData({ gameName, gameId, esewaNumber });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axios.post(
        `${API_URL}/user/edit`,
        {
          gameName: formData.gameName,
          gameId: formData.gameId,
          esewaNumber: formData.esewaNumber,
        },
        { withCredentials: true }
      );
      if (response.status === 200) {
        alert(response.data.message);
        setGameName(formData.gameName);
        setGameId(formData.gameId);
        setEsewaNumber(formData.esewaNumber);
        setShowModal(false);
      }
    } catch (err) {
      alert("Update failed!");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* ✅ Full screen blur and spinner during user data load */}
      {loadingUser && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: "blur(6px)",
            backgroundColor: "rgba(255,255,255,0.4)",
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      <div
        className="container mt-5 p-4 rounded shadow-lg"
        style={{
          background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
          color: "#1a1a1a",
          maxWidth: "600px",
        }}
      >
        <h2 className="fw-bold text-center mb-4">My Profile</h2>

        <div className="mb-3"><strong>🎮 Game Name:</strong> {gameName}</div>
        <div className="mb-3"><strong>🆔 Game ID:</strong> {gameId}</div>
        <div className="mb-3"><strong>📧 Email:</strong> {email}</div>
        <div className="mb-3"><strong>💰 eSewa Number:</strong> {esewaNumber}</div>

        <p className="mt-4">
          🏆 <strong>Note:</strong> Your winning prize will be sent to the eSewa number above.
        </p>

        <div className="text-center mt-4">
          <button className="btn btn-outline-dark fw-bold" onClick={openModal}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content position-relative">
              {/* ✅ Blur overlay while saving */}
              {saving && (
                <div
                  className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
                  style={{
                    backdropFilter: "blur(4px)",
                    backgroundColor: "rgba(255,255,255,0.5)",
                    zIndex: 1050,
                  }}
                >
                  <div className="spinner-border text-primary" role="status" />
                </div>
              )}

              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} disabled={saving}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Game Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gameName"
                    value={formData.gameName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Game ID</label>
                  <input
                    type="text"
                    className="form-control"
                    name="gameId"
                    value={formData.gameId}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">eSewa Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="esewaNumber"
                    value={formData.esewaNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)} disabled={saving}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
