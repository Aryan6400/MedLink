import { useState, useEffect } from "react";
import Grow from '@mui/material/Grow';
import { Button } from "@mui/material";
import { Backdrop, CircularProgress } from "@mui/material";
import "./adminPanel.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function AdminPanel() {
    const [doctor, setDoctor] = useState({});
    const { patient, setPatient, admin, setAdmin } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchAdminDetails = async () => {
        setLoading(true);
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/admin", {
                method: "GET",
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

    function logout() {
        if (patient) localStorage.removeItem("patient");
        else if (admin) localStorage.removeItem("admin");
        localStorage.removeItem("timestamp");
        setAdmin(false);
        setPatient(false);
        navigate("/login");
    }

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <Grow in={true} {...({ timeout: 250 })}>
                <div className='admin-panel'>
                    <div className="admin-panel-picture">
                        <img id="admin-profile" src={doctor.picturePath} alt="Profile Picture" />
                    </div>
                    <div className="admin-panel-details">
                        <p>Name: <strong>{doctor.name}</strong></p>
                        <p>Medical UID: <strong> {doctor.username}</strong></p>
                        <p>Degree: <strong>{doctor.degree ? doctor.degree : "Not available"}</strong></p>
                        <p>Specialization: <strong>{doctor.specialization ? doctor.specialization : "Not available"}</strong></p>
                        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                            <p>Hospital Id: <strong>{doctor.hospitalId}</strong></p>
                            <p>Mob: <strong>{doctor.Mob}</strong></p>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <Button id="admin-panel-logout-btn" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Grow>
        </>
    )
}

export default AdminPanel;
