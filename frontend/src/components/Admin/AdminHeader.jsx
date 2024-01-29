import React, { useState } from "react";
import { Link } from "react-router-dom";
import database from "../database";
import PersonIcon from '@mui/icons-material/Person';
const root = "https://localhost:3000";

function AdminHeader() {
  function logOut() {
    localStorage.clear();
    window.location.href = root + "/Login";
  }
  const auth = localStorage.getItem("admin");
  console.log(auth);
  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link className="head-link" to={!auth ? "/home" : "/admin"}>MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            {auth && <li className="nav-items">
              <Link className="nav-links" to="/user-profile">{JSON.parse(auth).name.slice(0, 8)}</Link>
            </li>}
            {auth && <li className="nav-items">
              <PersonIcon className="nav-links" />
            </li>}
            {!auth && <li className="nav-items">
              <Link className="nav-links" to="/Login">Admin</Link>
            </li>}
            {!auth && <li className="nav-items">
              <Link className="nav-links" to="/SignUp">SignUp</Link>
            </li>}
            {auth && <li className="nav-items">
              <Link onClick={logOut} className="nav-links" to="/Login">LogOut</Link>
            </li>}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;