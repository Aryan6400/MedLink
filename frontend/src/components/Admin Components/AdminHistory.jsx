import Prescription from "./Prescription";
import database from "../database";
import { useState, useEffect } from "react";
import { Backdrop, CircularProgress } from "@mui/material";


function AdminHistory() {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        // fetchAdminHistory();
    }, []);


    async function fetchAdminHistory(){
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        setLoading(true);
        try {
            const response = await fetch(
                "http://localhost:5000/admin/history",
                {
                    method: "GET",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                    Authorization: `Admin ${adminInfo.token}`
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                }
            );
            const data = await response.json();
            if(!data.message){
                setData(data);
                setLoading(false);
            }
            else{
                // setLoading(false);
                alert(data.message);
            }
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
                {data.map((item, index) => {
                    return (
                        <Prescription
                            key={index}
                            id={index}
                            aadhar={item.username}
                            doctorId={item.adminUsername}
                            age={item.age}
                            gender={item.gender}
                            name={item.name}
                            picturePath={item.picturePath}
                            diagnosis={item.diagnosis}
                            tests={item.tests}
                            diabetes={item.diabetes}
                        />
                    );
                })}
            </div>
        </>
    )
}

export default AdminHistory;
