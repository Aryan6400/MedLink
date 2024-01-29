import { useEffect, useState } from "react";
import "./profile.css"
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";
import { useUserInfo } from "../../context/UserInfoContext";

function UserProfile(){
    const [isLoading, setLoading] = useState(false);
    const {patientInfo, setPatientInfo} = useUserInfo();

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
            setPatientInfo(result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return(
        <div className='profile-container'>
            <ProfilePicture imgUrl={patientInfo.picturePath} />
            <ProfileInfo user={patientInfo} />
        </div>
    )
}

export default UserProfile;