import Prescription from "./Prescription";
import database from "../database";
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
            const response = await fetch("http://localhost:5000/user/history", {
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
        <div>
            {data.map((item, index) => {
                return (
                    <Prescription
                        key={index}
                        item={item}
                    />
                );
            })}
        </div>
    )
}

export default MedicalHistory;