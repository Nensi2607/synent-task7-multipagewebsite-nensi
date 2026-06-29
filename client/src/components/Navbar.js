import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" style={{ textDecoration: 'none' }}>🎓 CampusConnect</Link>

      <ul className="nav-links">
        <li><Link to="/" className={isActive('/')}>Home</Link></li>
        <li><Link to="/about" className={isActive('/about')}>About</Link></li>
        <li><Link to="/services" className={isActive('/services')}>Services</Link></li>
        <li><Link to="/announcements" className={isActive('/announcements')}>Notices</Link></li>
        <li><Link to="/events" className={isActive('/events')}>Events</Link></li>
        <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
      </ul>

      <div className="nav-user">
        {user ? (
          <>
            <span className="nav-badge">{user.role}</span>
            <Link to="/dashboard" className="btn btn-outline btn-sm">Dashboard</Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline btn-sm">Login</Link>
            <Link to="/register" className="btn btn-indigo btn-sm">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
