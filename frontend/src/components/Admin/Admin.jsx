import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import "./admin.css"
import { useEffect, useState } from "react";
import AdminPanel from "../AdminComponents/AdminPanel";
import AdminHistory from "../AdminComponents/AdminHistory";

function Admin() {
    const navigate = useNavigate();
    useEffect(() => {
        const admin = localStorage.getItem("admin");
        if (!admin) navigate('/login');
    }, []);
    return (
        <div className="home-container">
            <div className="admin-left">
                <div className="admin-left-innerdiv">
                    <AdminPanel />
                </div>
            </div>
            <div className="center">
                <div className="middle-top">
                    <div className="add-prescription-btn">
                        <Button href="/admin/add">Add new prescription.</Button>
                    </div>
                </div>
                <div className="middle">
                    <AdminHistory />
                </div>
            </div>
        </div>
    )
}

export default Admin;