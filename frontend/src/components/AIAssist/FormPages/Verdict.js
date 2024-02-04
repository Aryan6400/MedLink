import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";
import { useEffect, useState } from "react";

function Verdict() {
    const { setPage, aiData, symptoms } = usePage();
    const [isLoading, setLoading] = useState(false);
    const [verdict, setVerdict] = useState([]);

    const predictDisease = async() => {
        setLoading(true);
        let text = `${aiData.age} years old ${aiData.gender}, ${aiData.hyperTension=='yes' ? "hypertension, " : ""}${aiData.diabetes=='yes' ? "diabetes, " : ""}${aiData.anxiety=='yes' ? "anxiety, " : ""}${aiData.asthama=='yes' ? "asthama, " : ""}recently diagnosed with ${aiData.recentDiagnosis}, ${aiData.alcohol=='yes'? "drinks alcohol, " : ""}suffering from`
        symptoms.map((el, index)=>{
            if(index==0) text=text+" "+el;
            else text=text+", "+el;
        })
        console.log(text);
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/predict", {
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({text:text, symptoms:symptoms}),
            })
            const result = await response.json();
            console.log(result);
            setVerdict(result.slice(0,3));
            setLoading(false);
        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    useEffect(()=>{
        predictDisease();
    },[]);

    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="verdict-page-dummy">
                <div className="first-page-content">
                    <div className="verdict-card-box" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", justifyContent: "center" }}>
                        {verdict.length>0 && !isLoading && verdict.map(el => {
                            return (
                                <div className="verdict-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap:"10px" }}>
                                    <span style={{textAlign:"left"}}>{el.label}</span>
                                    <span>{el.score.toFixed(2)}%</span>
                                </div>
                            )
                        })}
                        {verdict.length==0 && !isLoading && <h2 style={{color:"red"}}>Failed to predict!</h2>}
                        {isLoading && <h3 style={{color:"#00B1B9"}}>Predicting...</h3>}
                    </div>
                    <div className="first-page-ctas">
                        <Button onClick={()=>setPage(prev=>prev-1)}>Previous</Button>
                        <Button onClick={() => { alert("Future Update!") }}>Find the best doctor for you</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verdict;