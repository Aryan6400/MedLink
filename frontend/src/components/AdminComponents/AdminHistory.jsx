import Prescription from "./Prescription";
import { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";


function AdminHistory() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchAdminHistory();
    }, []);


    async function fetchAdminHistory() {
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        setLoading(true);
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/admin/history", {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    Authorization: `Admin ${adminInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div>
                <h1>Your Patients' Prescriptions</h1>
                <hr style={{ border: "2px solid #B7EAE1" }} />
                {data.map((item, index) => {
                    return (
                        <Prescription
                            key={index}
                            item={item}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default AdminHistory;
