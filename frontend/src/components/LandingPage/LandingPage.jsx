import { Button } from "@mui/material";
import "./LandingPage.css"
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();
    return (
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
                    <Button onClick={()=>navigate("/ai-assist")}>Try our AI Assist</Button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
