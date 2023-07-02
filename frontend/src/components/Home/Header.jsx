import React, { useState } from "react";
import { Link } from "react-router-dom";
import database from "../database";
import "./header.css"
import PersonIcon from '@mui/icons-material/Person';
const root = "http://localhost:3000";

function Header() {
  function logOut() {
    localStorage.clear();
    window.location.href = root+"/Login";
  }
  const auth = localStorage.getItem("patient");
  return (
    <header>
      <div>
        <h1 className="head"><Link className="head-link" to={auth ? "/" : "/admin"}>MedLink</Link></h1>
        <p className="about"><Link className="about-link" to="/about">About</Link></p>
        {auth ? <p className="username"><Link className="profile-link" to="/user-profile">{JSON.parse(auth).name.slice(0,8)}</Link></p> : null}
        {auth ? <PersonIcon className="user-icon" /> : null}
        {!auth ? <p className="login"><Link className="login-link" to="/Login">Login</Link></p> : null}
        {!auth ? <p className="signup"><Link className="signup-link" to="/SignUp">SignUp</Link></p> : null}
        {auth ? <p className="logout"><Link onClick={logOut} className="logout-link" to="/Login">LogOut</Link></p> : null}
      </div>
    </header>
  );
}

export default Header;
