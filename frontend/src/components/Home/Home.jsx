import { useNavigate } from "react-router-dom";
import UserPanel from "../HomeComponents/UserPanel";
import MedicalHistory from "../HomeComponents/MedicalHistory";
import "./home.css"
import { useEffect } from "react";

function Home() {
    const navigate = useNavigate();
    useEffect(() => {
        const patient = localStorage.getItem("patient");
        if (!patient) navigate('/login')
    }, []);
    return (
        <div className="home-container">
            <div className="left" style={{height:"88.73vh"}}>
                <div className="left-innerdiv">
                    <UserPanel />
                </div>
            </div>
            <div className="center" style={{height: "88.73vh", overflowY: "auto"}}>
                <div className="middle">
                    <MedicalHistory />
                </div>
            </div>
        </div>
    )
}

export default Home;