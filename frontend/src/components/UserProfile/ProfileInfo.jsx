import { useState, useEffect } from "react";
import "./profile.css"
import EditForm from "./EditForm";
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';

function ProfileInfo({user}) {
    const [editing, setEditing] = useState(false);

    function editInfo() {
        setEditing((prevValue)=>{
            return !prevValue;
        });
    }

    return (
        <div className="profile-info-container">
            <div className='edit-container'>
                <div className="top">
                    <h2>Profile</h2>
                    <div onClick={editInfo} className="edit-btn">Edit</div>
                    <p>Basic Information for a healthy experience.</p>
                    <div className="profile-edit-icon">
                        <PanToolAltOutlinedIcon className="toggle-text-finger"/>
                    </div>
                </div>
                <div className="basic-info">
                    <p>Name: </p>
                    <p className="detail">{user.name}</p>
                    <p>Aadhar: </p>
                    <p className="detail">{user.username}</p>
                    <p>Mobile No: </p>
                    <p className="detail">{user.Mob}</p>
                    <p>Email: </p>
                    <p className="detail">{user.email}</p>
                    <p>DOB: </p>
                    <p className="detail">{user.DOB}</p>
                    <p>Gender: </p>
                    <p className="detail">{user.gender}</p>
                    <p>Age: </p>
                    <p className="detail">{user.age}</p>
                    <p>Address: </p>
                    <p className="detail">{user.address}</p>
                    <p>Pincode: </p>
                    <p className="detail">{user.pincode}</p>
                </div>
            </div>
            {editing && <EditForm onClick={editInfo} user={user} />}
        </div>
    )
}

export default ProfileInfo;