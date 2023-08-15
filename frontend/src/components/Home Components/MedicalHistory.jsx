import Prescription from "../Home Components/Prescription";
import database from "../database";
import { useState, useEffect } from "react";

function MedicalHistory() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const newData = [{
            index: 1,
            username: "singhAryan",
            adminUsername: "Aryan6400",
            age: 21,
            gender: "Male",
            name: "Aryan Singh",
            // picturePath: "",
            diagnosis: "fever",
            tests: "urine, diabetes",
            diabetes: "Normal"
        }, {
            index: 2,
            username: "dumbUtpal",
            adminUsername: "Aryan6400",
            age: 19,
            gender: "Male",
            name: "Utpal Raj",
            // picturePath: "",
            diagnosis: "oral-fetish",
            tests: "urine, blowjob",
            diabetes: "Normal"
        }, {
            index: 3,
            username: "loduRishi",
            adminUsername: "Aryan7481",
            age: 25,
            gender: "Male",
            name: "Rishikant Kashyap",
            // picturePath: "",
            diagnosis: "vaginal cancer",
            tests: "urine, sex",
            diabetes: "Normal"
        }];
        updateInformation(newData);
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
                        diabetes={item.diabetes}
                    />
                );
            })}
        </div>
    )
}

export default MedicalHistory;
