import { useEffect, useState } from "react";
import "./AdminProfile.css"
import AdminProfileInfo from "./AdminProfileInfo";
import { Backdrop, CircularProgress } from "@mui/material";
import AdminProfilePicture from "./AdminProfilePicture";
import { useAdminInfo } from "../../context/AdminInfoContext";

function AdminProfile() {
    const [isLoading, setLoading] = useState(false);
    const { adminInfo, setAdminInfo } = useAdminInfo();

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
            setAdminInfo(result);
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
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className='profile-container'>
                <AdminProfilePicture imgUrl={adminInfo.picturePath} />
                <AdminProfileInfo admin={adminInfo} />
            </div>
        </>
    )
}

export default AdminProfile;