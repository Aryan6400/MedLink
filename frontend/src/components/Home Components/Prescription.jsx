import { useState } from "react";
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import { TransitionGroup } from 'react-transition-group';
import "./prescription.css"
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';

function Prescription(props) {
    const [imgstate, setImgState] = useState(false);
    const [textstate, setTextState] = useState(false);
    function imgToggle() {
        setImgState((prev) => {
            return !prev;
        })
    }
    function textToggle() {
        setTextState((prev) => {
            return !prev;
        })
    }
    return (
        <div className="prescription-card">
            <div className="prescription-details">
                {!textstate && <Grow in={!textstate} {...(!textstate ? { timeout: 250 } : {})}>
                    <div onClick={textToggle}>
                        <p>Name: <strong>{props.name}</strong></p>
                        <p>Aadhar Number: <strong>{props.aadhar}</strong></p>
                    </div>
                </Grow>}
                {textstate && <Grow in={textstate} {...(textstate ? { timeout: 250 } : {})}>
                    <div className="expanded-details" onClick={textToggle}>
                        <p className="first-line"><strong>{props.name}</strong>, &nbsp;{props.age}, &nbsp;{props.gender}</p>
                        <p>Aadhar Number: <strong>{props.aadhar}</strong></p>
                        <p>Doctor Id: <strong>{props.doctorId}</strong></p>
                        <p>Diagnosis: <strong>{props.diagnosis}</strong></p>
                        <p>Tests: <strong>{props.tests}</strong></p>
                    </div>
                </Grow>}
                <div>
                    <p className="toggle-text" onClick={imgToggle} >prescription...</p>
                    <PanToolAltOutlinedIcon className="toggle-text-finger"/>
                </div>
            </div>
            <TransitionGroup>
            {imgstate ? <Fade in={imgstate}>
                <div id="image">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Prescription" />
                </div>
            </Fade> : null}
            </TransitionGroup>
        </div>
    )
}

export default Prescription;

