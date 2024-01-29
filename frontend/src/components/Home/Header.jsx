import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import database from "../database";
import "./header.css"
import PersonIcon from '@mui/icons-material/Person';
import { useAuth } from "../../context/AuthContext";

function Header() {
  const {patient, setPatient, admin, setAdmin} = useAuth();
  const navigate = useNavigate();

  function logout() {
    if(patient) localStorage.removeItem("patient");
    else if(admin) localStorage.removeItem("admin");
    setAdmin(false);
    setPatient(false);
    navigate("/login");
  }

  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link className="head-link">MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
          <li className="nav-items">
              <Link className="nav-links" to="/home">Home</Link>
            </li>
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            {patient && <li className="nav-items">
              <Link className="nav-links" to="/user-profile">Profile</Link>
            </li>}
            {admin && <li className="nav-items">
              <Link className="nav-links" to="/admin-profile">Admin</Link>
            </li>}
            {!admin && !patient ? <li className="nav-items">
              <Link className="nav-links" to="/login">Login</Link>
            </li> : null}
            {admin || patient ? <li className="nav-items">
              <span className="nav-links" onClick={logout}>Logout</span>
            </li> : null}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
