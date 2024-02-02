import { Button } from "@mui/material";
import { usePage } from "../../../context/FormPageContext";
import "./Pages.css";
import { useEffect, useState } from "react";

function Verdict() {
    const { setPage } = usePage();
    const [isLoading, setLoading] = useState(false);
    const [verdict, setVerdict] = useState([
        {
            name:"Maleria",
            prob:"70%"
        },
        {
            name:"Tubercolosis",
            prob:"24%"
        }
    ]);

    useEffect(()=>{
        // API for AI disease predictor
    },[])


    return (
        <div className="first-page">
            <div className="start-page-img"></div>
            <div className="verdict-page-dummy">
                <div className="first-page-content">
                    <div className="verdict-card-box" style={{ display: "flex", flexDirection: "column", gap: "20px", alignItems: "center", justifyContent: "center" }}>
                        {verdict.length>0 && !isLoading && verdict.map(el => {
                            return (
                                <div className="verdict-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span>{el.name}</span>
                                    <span>{el.prob}</span>
                                </div>
                            )
                        })}
                        {verdict.length==0 && !isLoading && <h2>Failed to predict!</h2>}
                        {isLoading && <h4>Predicting...</h4>}
                    </div>
                    <div className="first-page-ctas">
                        <Button onClick={() => setPage(0)}>Predict Again</Button>
                        <Button onClick={() => { alert("Future Update!") }}>Find the best doctor for you</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verdict;