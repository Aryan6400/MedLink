import { useState } from "react";
import Zoom from '@mui/material/Zoom';
import "./prescription.css"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';


function Prescription(props) {
    const [state, setState] = useState(false);
    function toggle() {
        setState((prev) => {
            return !prev;
        })
    }
    return (
        <div className="prescription-card">
            {/* <p>{props.name}</p>
            <p>{props.age}</p>
            <p>{props.gender}</p>
            <p>{props.diagnosis}</p>
            <p>{props.tests}</p>
            <p>{props.aadhar}</p>
            <p>{props.doctorId}</p>
            <img src={props.picturePath} alt="Prescription" /> */}
            <div className="prescription-details">
                {state && <CloseFullscreenIcon className="toggle-btn" onClick={toggle} />}
                <p>props.name</p>
                <p>props.age</p>
                <p>props.gender</p>
                <p>props.diagnosis</p>
                <p>props.tests</p>
                <p>props.aadhar</p>
                <p>props.doctorId</p>
                {!state && <MoreHorizIcon className="toggle-btn" onClick={toggle} />}
            </div>
            {state && <Zoom in={state}>
            <div id="image">
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Prescription" />
            </div>
            </Zoom>}
        </div>
    )
}

export default Prescription;

