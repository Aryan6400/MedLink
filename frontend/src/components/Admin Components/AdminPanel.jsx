import React, { useState, useEffect } from "react";


function AdminPanel(){
    const [imgUrl, setImgUrl] = useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")
    const [user, setUser] = useState({});
    useEffect(() => {
        let auth = localStorage.getItem("admin");
        auth = JSON.parse(auth);
        setUser(auth);
        const picturePath = auth.picturePath;
        if(picturePath) setImgUrl(picturePath);
    }, []);
    return(
        <div className='user-panel'>
            <div className="panel-picture">
                <img id="user-profile" src={imgUrl} alt="Profile Picture" />
            </div>
            <div className="admin-panel-details">
                <p>Unique Id </p> 
                <span>{user.username}</span>
                <p>Name</p>
                <span>{user.name}</span>
                <p>Degree</p>
                <span>{user.degree}</span>
                <p>Specialization</p>
                <span>{user.specialization}</span>
                <p>Hospital Id</p>
                <span>{user.hospitalId}</span>
            </div>
        </div>
    )
}

export default AdminPanel;
