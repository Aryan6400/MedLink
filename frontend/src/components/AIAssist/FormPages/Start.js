import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";

function Start() {
    const { setPage, setAiData, setSymptoms } = usePage();

    const handleClick = () => {
        setAiData({
            age: "",
            gender: "",
            weight: "",
            height: "",
            region: "",
            smoking: "",
            alcohol: "",
            recentDiagnosis: "",
            hyperTension: "",
            diabetes: "",
            anxiety: "",
            asthama: ""
        })
        setSymptoms([]);
        setPage(1);
    }

    return (
        <div className="AI-page">
            <div className="start-page-img"></div>
            <div className="start-page-content">
                <h1>Hello, This is MedLink Assistant</h1>
                <Button onClick={handleClick}>Click to begin</Button>
            </div>
        </div>
    )
}

export default Start;