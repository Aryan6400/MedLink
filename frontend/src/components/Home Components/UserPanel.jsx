import React, { useState, useEffect } from "react";


function UserPanel() {
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [user, setUser] = useState({});
    useEffect(() => {
        let auth = localStorage.getItem("patient");
        auth = JSON.parse(auth);
        setUser(auth);
        const picturePath = auth.picturePath;
        if(picturePath) setImgUrl(picturePath);
    }, []);

    return (
        <div className='user-panel'>
            <div className="panel-picture">
                <img id="user-profile" src={imgUrl} alt="Profile Picture" />
            </div>
            <div className="user-panel-details">
                <p>Aadhar</p>
                <span> {user.username}</span>
                <p>Name</p>
                <span>{user.name}</span>
                <p>Gender</p>
                <span>{user.gender}</span>
                <p>DOB</p>
                <span>{user.DOB}</span>
                <p>Mob No</p>
                <span>{user.Mob}</span>
                <p>Email Id</p>
                <span>{user.email}</span>
                <p>State</p>
                <span>{user.state}</span>
            </div>
        </div>
    )
}

export default UserPanel;
