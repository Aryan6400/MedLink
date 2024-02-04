import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Grow from '@mui/material/Grow';
import { Backdrop, CircularProgress } from "@mui/material";
import "./panel.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";


function UserPanel() {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);
    const { patient, setPatient, admin, setAdmin } = useAuth();
    const navigate = useNavigate();

    const fetchUserDetails = async () => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/user", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Patient ${userInfo.token}`
                },
            })
            const result = await response.json();
            setUser(result);
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
        fetchUserDetails();
    }, []);

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <Grow in={{}} {...({ timeout: 250 })}>
                <div className='user-panel'>
                    <div className="panel-picture">
                        <img id="user-profile" src={user.picturePath} alt="Profile Picture" />
                    </div>
                    <div className="user-panel-details">
                        <p>Name: <strong>{user.name}</strong></p>
                        <p>Aadhar Id: <strong> {user.username}</strong></p>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>DOB: <strong>{user.DOB ? user.DOB : "Not available"}</strong></p>
                            <p>Gender: <strong>{user.gender ? user.gender : "Not available"}</strong></p>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>Blood Group: <strong>{user.blood ? user.blood : "Not available"}</strong></p>
                            <p>Mob: <strong>{user.Mob}</strong></p>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginBottom: "10px" }}>
                        <Button id="panel-logout-btn" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Grow>
        </>
    )
}

export default UserPanel;
