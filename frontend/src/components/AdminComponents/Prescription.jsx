import { useState } from "react";
import "./prescription.css"
import Grow from '@mui/material/Grow';
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';
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
        <div className="prescription-card">
            <div className="prescription-details">
                <div className="expanded-details">
                    <p className="first-line"><strong>{item.userId.name}</strong>, &nbsp;{item.userId.age}, &nbsp;{item.userId.gender}</p>
                    <p>Aadhar Number: <strong>{item.userId.username}</strong></p>
                    <p>Doctor Id: <strong>{item.adminId.username}</strong></p>
                    <p>Diagnosis: <strong>{item.diagnosis}</strong></p>
                    <p>Tests: <strong>{item.tests}</strong></p>
                    <p>Tests: <strong>{item.diabetes}</strong></p>
                    <p>Tests: <strong>{item.height}</strong></p>
                    <p>Tests: <strong>{item.weight}</strong></p>
                </div>
                <div>
                    <p className="toggle-text" onClick={imgToggle} >prescription...</p>
                    <PanToolAltOutlinedIcon className="toggle-text-finger" />
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
    )
}

export default Prescription;

