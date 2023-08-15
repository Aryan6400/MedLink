import React, { useState, useEffect } from "react";
import Grow from '@mui/material/Grow';
import { Button } from "@mui/material";
import "./adminPanel.css";


function AdminPanel() {
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [user, setUser] = useState({});
    useEffect(() => {
        const auth = {
            index: 1,
            username: "7481",
            name: "Aryan Singh",
            picturePath: "",
            degree: "B.Tech",
            specialization: "Vet",
            hospitalId: "10015"
        }
        setUser(auth);
        const picturePath = auth.picturePath;
        if (picturePath) setImgUrl(picturePath);
    }, []);
    return (
        <Grow in={true} {...({ timeout: 250 })}>
            <div className='admin-panel'>
                <div className="admin-panel-picture">
                    <img id="admin-profile" src={imgUrl} alt="Profile Picture" />
                </div>
                <div className="admin-panel-details">
                    <p><strong>{user.name}</strong></p>
                    <p>Id: <strong>{user.username}</strong></p>
                    <p>Degree: <strong>{user.degree}</strong></p>
                    <p>Specialization: <strong>{user.specialization}</strong></p>
                    <p>Hospital Id: <strong>{user.hospitalId}</strong></p>
                    <Button id="panel-logout-btn">
                        Logout
                    </Button>
                </div>
            </div>
        </Grow>
    )
}

export default AdminPanel;
