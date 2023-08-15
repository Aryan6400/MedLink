import "./profile.css"
import ProfileInfo from "./ProfileInfo";
import ProfilePicture from "./ProfilePicture";

function UserProfile(){
    return(
        <div className='profile-container'>
            <ProfilePicture />
            <ProfileInfo />
        </div>
    )
}

export default UserProfile;