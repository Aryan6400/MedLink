import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";

function Second() {
    const { setPage, aiData, setAiData } = usePage();

    const handleChange = (e) => {
        setAiData(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            };
        });
    }

    const goToNextPage = () => {
        if(aiData.region=="" || aiData.smoking=="" || aiData.alcohol=="" || aiData.recentDiagnosis==""){
            alert("Fill all details!")
        }
        else{
            setPage(prev=>prev+1);
        }
    }

    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="second-page-dummy">
                <div className="first-page-content">
                    <h2>Do you assosiate yourself with these?</h2>
                    <div className="first-page-inputs">
                        <div className="form-inputs">
                            <label>City</label>
                            <input type="text" name="region" value={aiData.region} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Smoking</label>
                            <input type="text" name="smoking" value={aiData.smoking} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Alcohol</label>
                            <input type="text" name="alcohol" value={aiData.alcohol} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Recent Diagnosis</label>
                            <textarea type="text" rows={3} name="recentDiagnosis" value={aiData.recentDiagnosis} onChange={(e)=>handleChange(e)} />
                        </div>

                        <div className="first-page-ctas">
                            <Button onClick={() => setPage(prev => prev - 1)}>Previous</Button>
                            <Button onClick={goToNextPage}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Second;