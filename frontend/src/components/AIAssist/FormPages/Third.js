import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";

function Third() {
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
        if(aiData.hyperTension=="" || aiData.diabetes=="" || aiData.anxiety=="" || aiData.asthama==""){
            alert("Fill all details!")
        }
        else{
            setPage(prev=>prev+1);
        }
    }

    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="third-page-dummy">
                <div className="first-page-content">
                    <h2>Do you assosiate yourself with these?</h2>
                    <div className="first-page-inputs">
                        <div className="form-inputs">
                            <label>Hypertension</label>
                            <input type="text" name="hyperTension" value={aiData.hyperTension} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Diabetes</label>
                            <input type="text" name="diabetes" value={aiData.diabetes} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Anxiety</label>
                            <input type="text" name="anxiety" value={aiData.anxiety} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Asthama</label>
                            <input type="text" name="asthama" value={aiData.asthama} onChange={(e)=>handleChange(e)} />
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

export default Third;