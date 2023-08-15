import { useNavigate } from "react-router-dom";
import UserPanel from "../Home Components/UserPanel";
import MedicalHistory from "../Home Components/MedicalHistory";
import "./home.css"
import { useEffect } from "react";

function Home() {
    // const navigate = useNavigate();
    // useEffect(() => {
    //     let auth = localStorage.getItem("patient");
    //     if (!auth) navigate('/SignUp')
    // }, []);
    return (
        <div className="home-container">
            <div className="left">
                <div className="left-innerdiv">
                    <UserPanel />
                </div>
            </div>
            <div className="center">
                <div className="middle">
                    <MedicalHistory />
                </div>
            </div>
        </div>
    )
}

export default Home;