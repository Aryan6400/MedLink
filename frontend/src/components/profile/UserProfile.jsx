import "./profile.css"
import EditProfile from "./BasicProfile";
import ProfilePicture from "./ProfilePicture";

function UserProfile(){
    return(
        <div className='profile-container'>
            <ProfilePicture />
            <EditProfile />
        </div>
    )
}

export default UserProfile;