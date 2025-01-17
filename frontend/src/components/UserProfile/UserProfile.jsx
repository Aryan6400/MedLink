import { useCallback, useEffect, useState } from "react";
import "./profile.css"
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";
import { useUserInfo } from "../../context/UserInfoContext";
import { Backdrop, CircularProgress } from "@mui/material";


function UserProfile() {
    const [isLoading, setLoading] = useState(false);
    const { patientInfo, setPatientInfo } = useUserInfo();

    const fetchUserDetails = useCallback( async () => {
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
            setPatientInfo(result);
            console.log("yes");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    },[])

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
            <div className='profile-container'>
                <ProfilePicture imgUrl={patientInfo.picturePath} />
                <ProfileInfo user={patientInfo} />
            </div>
        </>
    )
}

export default UserProfile;