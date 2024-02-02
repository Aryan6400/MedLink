import { useState } from "react";
import "./AdminProfile.css"
import AdminEditForm from "./AdminEditForm";
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';

function ProfileInfo({ admin }) {
    const [editing, setEditing] = useState(false);

    function editInfo() {
        setEditing((prevValue) => {
            return !prevValue;
        });
    }

    return (
        <div className="profile-info-container">
            <div className='edit-container'>
                <div className="top">
                    <h2>Admin Profile</h2>
                    <div onClick={editInfo} className="edit-btn">Edit</div>
                    <p>Basic Information for a healthy experience.</p>
                    <div className="profile-edit-icon">
                        <PanToolAltOutlinedIcon className="toggle-text-finger" />
                    </div>
                </div>
                <div className="basic-info basic-admin-info">
                    <p>Name: </p>
                    <p className="detail">{admin.name}</p>
                    <p>Medical UID: </p>
                    <p className="detail">{admin.username}</p>
                    <p>Mobile No: </p>
                    <p className="detail">{admin.Mob}</p>
                    <p>Hospital Id: </p>
                    <p className="detail">{admin.hospitalId}</p>
                    <p>Specialization: </p>
                    <p className="detail">{admin.specialization}</p>
                    <p>Gender: </p>
                    <p className="detail">{admin.gender}</p>
                    <p>Age: </p>
                    <p className="detail">{admin.age}</p>
                    <p>Degree: </p>
                    <p className="detail">{admin.degree}</p>
                </div>
            </div>
            {editing && <AdminEditForm onClick={editInfo} admin={admin} />}
        </div>
    )
}

export default ProfileInfo;