import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext); // ✅ CORRECT PLACE
  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        alert(response.data.message);
        setLoggedIn(false); // ✅ update context
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
      style={{
        background: 'linear-gradient(to right,rgb(43, 77, 92),rgb(26, 57, 70), #2c5364)',
      }}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">FF Tournament</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/tournment">Tournament</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/my-match">My Match</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/notification">Notification</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/support">Support</Link></li>

            {loggedIn ? (
              <li className="nav-item">
                <span className="nav-link" role="button" onClick={logoutUser}>LogOut</span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/login">LogIn</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
