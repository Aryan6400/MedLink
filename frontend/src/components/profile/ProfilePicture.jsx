import React, { useState, useEffect } from "react";
import "./profile.css"
import { Link } from "react-router-dom";
const root = "http://localhost:3000";


function ProfilePicture() {
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");

    useEffect(() => {
        let auth = localStorage.getItem("patient");
        auth = JSON.parse(auth);
        const picturePath = auth.picturePath;
        if(picturePath) setImgUrl(picturePath);
    }, []);

    function logOut() {
        localStorage.clear();
        window.location.href = root + "/Login";
    }

    return (
        <div className='picture-container'>
            <div className="picture-card">
                <img id="profile-picture" src={imgUrl} alt="Profile Picture" />
            </div>
            <p className="profile-logout"><Link onClick={logOut} className="logout-button" to="/Login">LogOut</Link></p>
        </div>
    )
}

export default ProfilePicture;