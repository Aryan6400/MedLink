import React, { useState, useEffect } from "react";
import Grow from '@mui/material/Grow';
import { Button } from "@mui/material";
import "./adminPanel.css";


function AdminPanel() {
    const [doctor, setDoctor] = useState({});
    const [isLoading, setLoading] = useState(false);

    const fetchAdminDetails = async() => {
        setLoading(true);
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        try {
            const response = await fetch("http://localhost:5000/admin", {
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Admin ${adminInfo.token}`
                },
            })
            const result = await response.json();
            setDoctor(result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    return (
        <Grow in={true} {...({ timeout: 250 })}>
            <div className='admin-panel'>
                <div className="admin-panel-picture">
                    <img id="admin-profile" src={doctor.picturePath} alt="Profile Picture" />
                </div>
                <div className="admin-panel-details">
                    <p><strong>{doctor.name}</strong></p>
                    <p>Id: <strong>{doctor.username}</strong></p>
                    <p>Degree: <strong>{doctor.degree}</strong></p>
                    <p>Specialization: <strong>{doctor.specialization}</strong></p>
                    <p>Hospital Id: <strong>{doctor.hospitalId}</strong></p>
                    <Button id="panel-logout-btn">
                        Logout
                    </Button>
                </div>
            </div>
        </Grow>
    )
}

export default AdminPanel;
