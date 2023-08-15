import React, { useState, useEffect, useRef } from "react";
import { Button } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import "./profile.css"
import Fade from '@mui/material/Fade';
import { Link } from "react-router-dom";
const root = "http://localhost:3000";


function ProfilePicture() {
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png");
    const [newProfileFileName, setNewProfileFileName] = useState(null);
    const profileChangeInput = useRef(null);

    // useEffect(() => {
    //     let auth = localStorage.getItem("patient");
    //     auth = JSON.parse(auth);
    //     const picturePath = auth.picturePath;
    //     if(picturePath) setImgUrl(picturePath);
    // }, []);

    function logOut() {
        localStorage.clear();
        window.location.href = root + "/Login";
    }

    function triggerFileInput() {
        profileChangeInput.current.click();
    }
    function handleNewProfileFileUpload(event) {
        setNewProfileFileName(event.target.files[0].name);
        console.log(event.target.files[0]);
    }

    return (
        <div className='picture-container'>
            <div className="picture-card">
                <img id="profile-picture" src={imgUrl} alt="Profile Picture" />
            </div>
            <div onClick={triggerFileInput}>
                <ModeEditOutlineIcon className="edit-profile-image-icon" />
                <Fade in={true} >
                    <div className="text-on-hover">Change profile picture</div>
                </Fade>
            </div>

            <input type="file" id="fileInput" ref={profileChangeInput} onChange={handleNewProfileFileUpload} style={{ display: 'none' }} />
            <div>
                <Button id="profile-logout-btn">Logout</Button>
            </div>
        </div>
    )
}

export default ProfilePicture;