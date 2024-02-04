import { useState } from "react";
import "./prescription.css"
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { TransitionGroup } from 'react-transition-group';
import Fade from '@mui/material/Fade';


function Prescription({ item }) {
    const [imgstate, setImgState] = useState(false);

    function imgToggle() {
        setImgState((prev) => {
            return !prev;
        })
    }

    return (
        <>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px", marginTop: "40px", padding: "0px 20px" }}>
                <span>Date: {item.createdAt.split("T")[0]} &nbsp; {item.createdAt.split("T")[1].split(".")[0].slice(0, 5)}</span>
            </div>
            <div className="prescription-card">
                <div className="prescription-details">
                    <div className="expanded-details">
                        <p>Patient Name: <strong>{item.userId.name}</strong></p>
                        <p>Patient Contact: <strong>{item.userId.Mob}</strong></p>
                        <p>Gender: <strong>{item.userId.gender ? item.userId.gender : "Not available"}</strong></p>
                        <p>Blood group: <strong>{item.userId.blood ? item.userId.blood : "Not available"}</strong></p>
                        <p>Height: <strong>{item.height}</strong></p>
                        <p>Weight: <strong>{item.weight}</strong></p>
                        <p>Diagnosis: <strong>{item.diagnosis}</strong></p>
                        <p>Diabetes: <strong>{item.diabetes}</strong></p>
                        <p>Tests: <strong>{item.tests}</strong></p>
                    </div>
                    <div onClick={imgToggle} style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                        <p className="toggle-text">Show more</p>
                        {!imgstate ? <KeyboardDoubleArrowDownIcon className="toggle-text-icon" /> : <KeyboardDoubleArrowUpIcon className="toggle-text-icon" />}
                    </div>
                </div>
                <TransitionGroup>
                    {imgstate ? <Fade in={imgstate}>
                        <div id="image">
                            <img src={item.picturePath} alt="Prescription" />
                        </div>
                    </Fade> : null}
                </TransitionGroup>
            </div>
        </>
    )
}

export default Prescription;

