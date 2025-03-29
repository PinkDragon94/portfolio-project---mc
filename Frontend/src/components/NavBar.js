import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/global.css';

const NavBar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1 className="logo">My MC</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/Contact">Contact</Link></li>
        <li><Link to="/Getinvolved">Get Involed</Link></li>
        {/* ... other nav items ... */}

        {!user ? (
          <>
            {/* <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li> */}
          </>
        ) : (
          <li><button onClick={logout}>Logout</button></li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;