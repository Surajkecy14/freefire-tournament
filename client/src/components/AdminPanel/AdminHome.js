// components/AdminPanel/AdminHome.jsx
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="container-fluid">
      <div className="row min-vh-100">
        {/* Sidebar */}
        <div className="col-md-3 col-lg-2 bg-dark text-white p-3">
          <h4 className="text-center mb-4">Admin Panel</h4>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/admin/all-users" className="nav-link text-white">All Users</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/join-requests" className="nav-link text-white">Join Requests</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/joined-tournaments" className="nav-link text-white">Joined Tournaments</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/game-control" className="nav-link text-white">Game Control</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/id-pass" className="nav-link text-white">ID & Password Send</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/send-notification" className="nav-link text-white">Send Notification</Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-9 col-lg-10 bg-light p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
