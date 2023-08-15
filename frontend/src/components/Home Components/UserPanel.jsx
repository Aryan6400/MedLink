import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Grow from '@mui/material/Grow';
import "./panel.css";


function UserPanel() {
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [user, setUser] = useState({});
    useEffect(() => {
        const auth = {
            index: 1,
            username: "singhAryan",
            DOB: "28-12-2002",
            name: "Aryan Singh",
            picturePath: "",
            Mob: "7033099577",
            email: "aryan@gmail.com",
        }
        setUser(auth);
        const picturePath = auth.picturePath;
        if (picturePath) setImgUrl(picturePath);
    }, []);

    return (
        <Grow in={{}} {...({ timeout: 250 })}>
            <div className='user-panel'>
                <div className="panel-picture">
                    <img id="user-profile" src={imgUrl} alt="Profile Picture" />
                </div>
                <div className="user-panel-details">
                    <p><strong>{user.name}</strong></p>
                    <p><strong> {user.username}</strong></p>
                    <p>DOB: <strong>{user.DOB}</strong></p>
                    <p>Mob No: <strong>{user.Mob}</strong></p>
                    <p>Email Id: <strong>{user.email}</strong></p>
                    <Button id="panel-logout-btn">
                        Logout
                    </Button>
                </div>
            </div>
        </Grow>
    )
}

export default UserPanel;
