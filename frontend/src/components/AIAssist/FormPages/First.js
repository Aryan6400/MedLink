import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";

function First() {
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
        if(aiData.age=="" || aiData.gender=="" || aiData.weight=="" || aiData.height==""){
            alert("Fill all details!")
        }
        else{
            setPage(prev=>prev+1);
        }
    }

    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="first-page-dummy">
                <div className="first-page-content">
                    <h1>Medlink Assistant</h1>
                    <h2>Tell us a bit about yourself</h2>
                    <div className="first-page-inputs">
                        <div className="form-inputs">
                            <label>Age</label>
                            <input type="text" name="age" value={aiData.age} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Gender</label>
                            <input type="text" name="gender" value={aiData.gender} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Weight(kg)</label>
                            <input type="text" name="weight" value={aiData.weight} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="form-inputs">
                            <label>Height(cm)</label>
                            <input type="text" name="height" value={aiData.height} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className="first-page-ctas">
                            <Button onClick={()=>setPage(prev=>prev-1)}>Previous</Button>
                            <Button onClick={goToNextPage}>Next</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default First;