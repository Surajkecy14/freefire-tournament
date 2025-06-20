import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false); // ✅ logout loading state

  const logoutUser = async () => {
    setLoggingOut(true); // ✅ show blur
    try {
      const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
      if (response.status === 200) {
        alert(response.data.message);
        setLoggedIn(false);
        navigate('/login');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoggingOut(false); // ✅ hide blur
    }
  };

  const handleNavClick = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    if (
      navbarToggler &&
      window.innerWidth < 992 &&
      navbarCollapse.classList.contains('show')
    ) {
      navbarToggler.click();
    }
  };

  return (
    <>
      {/* ✅ Full-screen blur and spinner during logout */}
      {loggingOut && (
        <div
          className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
          style={{
            backdropFilter: 'blur(6px)',
            backgroundColor: 'rgba(255,255,255,0.4)',
            zIndex: 9999,
          }}
        >
          <div className="spinner-border text-primary" role="status" />
        </div>
      )}

      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{
          background: 'linear-gradient(to right,rgb(43, 77, 92),rgb(26, 57, 70), #2c5364)',
        }}
      >
        <div className="container">
          <Link className="navbar-brand fw-bold text-primary" to="/" onClick={handleNavClick}>
            FF Tournament
          </Link>
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
              <li className="nav-item">
                <Link className="nav-link" to="/" onClick={handleNavClick}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/tournment" onClick={handleNavClick}>Tournament</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-match" onClick={handleNavClick}>My Match</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notification" onClick={handleNavClick}>Notification</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile" onClick={handleNavClick}>Profile</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/support" onClick={handleNavClick}>Support</Link>
              </li>

              {loggedIn ? (
                <li className="nav-item">
                  <span
                    className="nav-link"
                    role="button"
                    onClick={() => {
                      logoutUser();
                      handleNavClick();
                    }}
                  >
                    LogOut
                  </span>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={handleNavClick}>LogIn</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
