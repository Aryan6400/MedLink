import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import database from "../database";
import "./header.css"
import PersonIcon from '@mui/icons-material/Person';
const root = "http://localhost:3000";

function Header() {
  const [isAdmin, setAdmin] = useState(false);
  const [isUser, setUser] = useState(false);
  useEffect(() => {
    const admin = localStorage.getItem("admin");
    const user = localStorage.getItem("patient");
    if (admin) setAdmin(true);
    else if (user) setUser(true);
  }, []);

  function logout() {
    localStorage.clear();
    // setAdmin(false);
    // setUser(false);
    window.location.href = root + "/login";
  }

  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link className="head-link" to="/home">MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            {isUser && <li className="nav-items">
              <Link className="nav-links" to="/user-profile">Patient</Link>
            </li>}
            {isAdmin && <li className="nav-items">
              <Link className="nav-links" to="/admin-profile">Admin</Link>
            </li>}
            {isAdmin || isUser ? <li className="nav-items">
              <PersonIcon className="nav-links" />
            </li> : null}
            {!isAdmin && !isUser ? <li className="nav-items">
              <Link className="nav-links" to="/login">Login</Link>
            </li> : null}
            {isAdmin || isUser ? <li className="nav-items">
              <Link className="nav-links" onClick={logout}>LogOut</Link>
            </li> : null}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
