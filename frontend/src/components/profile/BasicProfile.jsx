import React, { useState, useEffect } from "react";
import "./profile.css"
import EditIcon from '@mui/icons-material/Edit';
import database from "../database";
import EditForm from "./EditForm";

function EditProfile() {
    const [editing, setEditing] = useState(false);
    const [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        age: "",
        gender: "",
        Mob: "",
        address: "",
        pincode: "",
        DOB: ""
    })
    useEffect(() => {
        let auth = localStorage.getItem("patient");
        auth = JSON.parse(auth);
        const username = auth.username;
        database.getData(`http://localhost:5000/user-${username}`).then(function (data) {
            updateInformation(data);
        })
    }, []);

    function updateInformation(data) {
        setUser(data);
    }

    function editInfo() {
        setEditing((prevValue)=>{
            return !prevValue;
        });
    }
    return (
        <div>
            <div className='edit-container'>
                <div className="top">
                    <h2>Profile</h2>
                    <div onClick={editInfo} className="edit-btn">Edit</div>
                    <p>Basic Information, for a healthy experience.</p>
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

export default EditProfile;