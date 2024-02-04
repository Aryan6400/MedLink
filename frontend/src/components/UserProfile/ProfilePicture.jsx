import { useState, useRef } from "react";
import { Button } from "@mui/material";
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import "./profile.css"
import Fade from '@mui/material/Fade';
import { useNavigate } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useUserInfo } from "../../context/UserInfoContext";


function ProfilePicture({ imgUrl }) {
    const [pic, setPic] = useState("");
    const [picName, setPicName] = useState("");
    const [isLoading, setLoading] = useState(false);
    const profileChangeInput = useRef(null);
    const navigate = useNavigate();
    const { patient, setPatient, admin, setAdmin } = useAuth();
    const { setPatientInfo } = useUserInfo();

    function logout() {
        if (patient) localStorage.removeItem("patient");
        else if (admin) localStorage.removeItem("admin");
        localStorage.removeItem("timestamp");
        setAdmin(false);
        setPatient(false);
        navigate("/login");
    }

    function triggerFileInput() {
        profileChangeInput.current.click();
    }

    const PostDetails = async (pic) => {
        setLoading(true);
        try {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "HealthGen");
            data.append("cloud_name", "dfj3rhjvl");
            const response = await fetch("https://api.cloudinary.com/v1_1/dfj3rhjvl/image/upload", {
                method: "POST",
                body: data,
            });
            const result = await response.json();
            console.log(result.url.toString());
            setPic(result.url.toString());
            setPicName(pic.name);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const handleNewProfileFileUpload = async () => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/update-user-picture", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Patient ${userInfo.token}`
                },
                body: JSON.stringify({ picturePath: pic }),
            })
            const result = await response.json();
            setPatientInfo(result);
            setLoading(false);
            setPic("");
            setPicName("");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const CancelChange = () => {
        setPic("");
        setPicName("");
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className='picture-container'>
                <div className="picture-card">
                    <img id="profile-picture" src={pic ? pic : imgUrl} alt="Profile Picture" />
                </div>
                <div>
                    <ModeEditOutlineIcon onClick={triggerFileInput} className="edit-profile-image-icon" />
                    {!pic ?
                        <Fade in={true} >
                            <div className="text-on-hover">Change profile picture</div>
                        </Fade>
                        : <div>{picName}</div>
                    }
                    {pic &&
                        <div className="change-btns">
                            <Button className="hidden-button" onClick={handleNewProfileFileUpload}>Submit</Button>
                            <Button className="hidden-button" onClick={CancelChange}>Cancel</Button>
                        </div>}
                </div>

                <input type="file" accept="image/*" id="fileInput" ref={profileChangeInput} onChange={(e) => PostDetails(e.target.files[0])} style={{ display: 'none' }} />
                <div>
                    <Button id="profile-logout-btn" onClick={logout}>Logout</Button>
                </div>
            </div>
        </>
    )
}

export default ProfilePicture;