import Prescription from "./Prescription";
import database from "../database";
import {useState, useEffect} from "react";

function AdminHistory() {
    const [data, setData] = useState([]);
    useEffect(() => {
        let auth = localStorage.getItem("admin");
        auth = JSON.parse(auth);
        const username = auth.username;
        database.getData(`http://localhost:5000/user-${username}/history`).then(function (data) {
            updateInformation(data);
        })
    }, []);

    function updateInformation(data) {
        setData(data);
    }

    return (
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
                    />
                );
            })}
        </div>
    )
}

export default AdminHistory;
