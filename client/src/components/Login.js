import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const API_URL = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        { withCredentials: true }
      );

      const message = response.data.message;

      // Admin Login
      if (response.status === 201) {
        alert('Welcome Admin!');
        setLoggedIn(true);
        navigate('/admin/all-users');
      }
      // User Login
      else if (response.status === 200) {
        alert(message || 'Login successful!');
        setLoggedIn(true);
        navigate('/');
      }
      // Unknown response
      else {
        alert('Unknown user role or response');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        alert(error.response.data.message);
      } else {
        alert('Server error! Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container mt-5 p-4 rounded shadow-lg"
      style={{
        background: 'linear-gradient(135deg, #ff758c, #ff7eb3)',
        color: 'white',
        maxWidth: '500px',
      }}
    >
      <h2 className="mb-4 fw-bold text-center">Login to nepGame</h2>
      <p className="text-center mb-4">
        You must be logged in to join tournaments and view your profile.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-light fw-bold w-100 mt-3"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p className="text-center mt-3">
        Don’t have an account?{' '}
        <Link
          to="/create"
          style={{
            color: '#fcd34d',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
