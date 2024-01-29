import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import "./admin.css"
import { useEffect, useState } from "react";
import AdminPanel from "../Admin Components/AdminPanel";
import AdminHistory from "../Admin Components/AdminHistory";

function Admin() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     let auth = localStorage.getItem("admin");
    //     if (!auth) navigate('https://mercor-medlink.netlify.app/admin-signUp')
    // }, []);
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