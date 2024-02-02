import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Grow from '@mui/material/Grow';
import "./panel.css";


function UserPanel() {
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(false);

    const fetchUserDetails = async() => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        try {
            const response = await fetch("http://localhost:5000/user", {
                method:"GET",
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
    
    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <Grow in={{}} {...({ timeout: 250 })}>
            <div className='user-panel'>
                <div className="panel-picture">
                    <img id="user-profile" src={user.picturePath} alt="Profile Picture" />
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
