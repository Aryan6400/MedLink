import React, { useState } from "react";
import { Link } from "react-router-dom";
import database from "../database";
import "./admin.css"
import PersonIcon from '@mui/icons-material/Person';
const root = "http://localhost:3000";

function AdminHeader() {
  function logOut() {  
    localStorage.clear();
    window.location.href = root+"/Login";
  }
  const auth = localStorage.getItem("admin");
  console.log(auth);
  return (
    <header>
      <div>
        <h1 className="head"><Link className="head-link" to={auth ? "/admin" : "/"}>HealthGen</Link></h1>
        <p className="about"><Link className="about-link" to="/about">About</Link></p>
        {auth ? <p className="username">{JSON.parse(auth).name.slice(0,8)}</p> : null}
        {auth ? <PersonIcon className="user-icon" /> : null}
        {!auth ? <p className="login"><Link className="login-link" to="/Login">Login</Link></p> : null}
        {!auth ? <p className="signup"><Link className="signup-link" to="/SignUp">SignUp</Link></p> : null}
        {auth ? <p className="logout"><Link onClick={logOut} className="logout-link" to="/Login">LogOut</Link></p> : null}
      </div>
    </header>
  );
}

export default AdminHeader;
