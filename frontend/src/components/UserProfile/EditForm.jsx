import { useState } from "react";
import { RadioGroup, Radio, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { useUserInfo } from "../../context/UserInfoContext";


function EditForm(props) {
    const [isLoading, setLoading] = useState(false);
    const {setPatientInfo} = useUserInfo();
    const [user, setUser] = useState({
        name: props.user.name ? props.user.name : "",
        email: props.user.email ? props.user.email : "",
        age: props.user.age ? props.user.age : "",
        gender: props.user.gender ? props.user.gender : "",
        Mob: props.user.Mob ? props.user.Mob : "",
        address: props.user.address ? props.user.address : "",
        pincode: props.user.pincode ? props.user.pincode : "",
        DOB: props.user.DOB ? props.user.DOB : "",
        blood: props.user.blood ? props.user.blood : ""
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => {
            return {
                ...prevUser,
                [name]: value
            };
        });
    }

    console.log(user);

    const onSubmit = async() => {
        setLoading(true);
        const userInfo = JSON.parse(localStorage.getItem("patient"));
        console.log(userInfo);
        try {
            const response = await fetch("https://medlink-ugwj.onrender.com/update-user", {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Patient ${userInfo.token}`
                },
                body:JSON.stringify(user),
            })
            const result = await response.json();
            setPatientInfo(result);
            setLoading(false);
            props.onClick();
        } catch (error) {
            setLoading(false);
            console.error(error);
            props.onClick();
        }
    }

    function Close() {
        props.onClick();
    }

    return (
        <div>
            <form className="edit-form">
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Name" name="name" value={user.name} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Email" name="email" value={user.email} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Mobile No" name="Mob" value={user.Mob} />
                </div>
                <FormGroup className='gender-div'>
                    <label>Gender: </label>
                    <RadioGroup
                        name="gender"
                    
                    >
                        <div className='radio-btns'>
                            <FormControlLabel
                                value="male"
                                control=<Radio />
                                label="Male" onChange={handleChange}
                                className='radio'
                            />
                            <FormControlLabel
                                value="female"
                                control=<Radio />
                                label="Female" onChange={handleChange}
                                className='radio'
                            />
                            <FormControlLabel
                                value="other"
                                control=<Radio />
                                label="Rather Not Say" onChange={handleChange}
                                className='radio'
                            />
                        </div>
                    </RadioGroup>
                </FormGroup>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Age" name="age" value={user.age} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Blood Group" name="blood" value={user.blood} />
                </div>
                <div className='address-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} multiline rows={2} label="Address" name="address" value={user.address} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Pincode" name="pincode" value={user.pincode} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="DOB(dd-mm-yyyy)" name="DOB" value={user.DOB} />
                </div>
                <div className='submit-div'>
                    <Button onClick={onSubmit} id='submit-btn'>
                        Update
                    </Button>
                </div>
                <div className='close-div'>
                    <Button onClick={Close} id='close-btn'>
                        Close
                    </Button>
                </div>
            </form>
        </div>
    )
}


export default EditForm;