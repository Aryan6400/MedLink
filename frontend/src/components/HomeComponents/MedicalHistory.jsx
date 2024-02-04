import Prescription from "./Prescription";
import { Backdrop, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";

function MedicalHistory() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        fetchUserHistory();
    }, []);


    async function fetchUserHistory() {
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        setLoading(true);
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/user/history", {
                method: "GET",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    Authorization: `Patient ${userInfo.token}`
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
            });
            const result = await response.json();
            console.log(result);
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
                <h1>Your Prescriptions</h1>
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

export default MedicalHistory;
