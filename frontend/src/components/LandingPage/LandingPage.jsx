import { Button } from "@mui/material";
import "./LandingPage.css"
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import { usePage } from "../../context/FormPageContext";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

function LandingPage() {
    const {setPage} = usePage();
    const {setPatient, setAdmin} = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        const timestamp = JSON.parse(localStorage.getItem("timestamp"));
        if (userInfo && timestamp){
            const originalTimestamp = new Date(timestamp);
            const currentTimestamp = new Date();
            const timeDifference = currentTimestamp-originalTimestamp;
            const hoursDifference = timeDifference/(1000*60*60);
            if (hoursDifference >= 24) {
                localStorage.removeItem("patient");
                localStorage.removeItem("timestamp");
                setPatient(false);
            }
        }
        else if(adminInfo && timestamp){
            const originalTimestamp = new Date(timestamp);
            const currentTimestamp = new Date();
            const timeDifference = currentTimestamp-originalTimestamp;
            const hoursDifference = timeDifference/(1000*60*60);
            if (hoursDifference >= 24) {
                localStorage.removeItem("admin");
                localStorage.removeItem("timestamp");
                setAdmin(false);
            }
        }
    }, []);

    return (
        <>
            <div className="landing-page-container">
                <div className="landing-page-img"></div>
                <div className="landing-page-content">
                    <h1>Welcome To MedLink!</h1>
                    <p>Your health companion for AI-assisted preliminary disease prediction.</p>
                    <p>Connect easily, gain insights, and prioritize well-being.</p>
                    <p>Empowering you on your journey to a healthier life.</p>
                    <p>Welcome to a brighter, tech-driven future in healthcare!</p>
                    <div className="landing-page-ctas">
                        <Button><a href="mailto:singharyan7481@gmail.com">Contact Us</a></Button>
                        <Button onClick={() => {setPage(0); navigate("/med-bot")}}>Find your illness with MEDBot</Button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default LandingPage;
