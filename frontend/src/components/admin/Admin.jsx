import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import "./admin.css"
import { useEffect, useState } from "react";
import AdminPanel from "../Admin Components/AdminPanel";
import AdminHistory from "../Admin Components/AdminHistory";

function Admin() {
    const navigate = useNavigate();
    useEffect(() => {
        let auth = localStorage.getItem("admin");
        if (!auth) navigate('/admin-signUp')
    }, []);
    return (
        <div className="home-container">
            <div className="admin-left">
                <AdminPanel />
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