import React, { useState, useEffect } from "react";
import "./profile.css"
import database from "../database";
import EditForm from "./EditForm";
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';

function ProfileInfo() {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({
        name: "Aryan Singh",
        username: "2155423894751248",
        email: "aryan6400cool@gmail.com",
        age: "21",
        gender: "Male",
        Mob: "7033099577",
        address: "Vidyasagar Hall of Residence, IIT Kharagpur",
        pincode: "721302",
        DOB: "28-12-2002"
    })

    function updateInformation(data) {
        const newData = {...data, username: user.username}
        setUser(newData);
    }

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
                    <p>Basic Information, for a healthy experience.</p>
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
            {editing && <EditForm onClick={editInfo} user={user} updateInformation={updateInformation} />}
        </div>
    )
}

export default ProfileInfo;