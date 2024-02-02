import { useState } from "react";
import { RadioGroup, Radio, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { useAdminInfo } from "../../context/AdminInfoContext";


function EditForm(props) {
    const [isLoading, setLoading] = useState(false);
    const {setAdminInfo} = useAdminInfo();
    const [admin, setAdmin] = useState({
        name: props.admin.name ? props.admin.name : "",
        hospitalId: props.admin.hospitalId ? props.admin.hospitalId : "",
        gender: props.admin.gender ? props.admin.gender : "",
        Mob: props.admin.Mob ? props.admin.Mob : "",
        age: props.admin.age ? props.admin.age : "",
        specialization: props.admin.specialization ? props.admin.specialization : "",
        degree: props.admin.degree ? props.admin.degree : "",
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setAdmin(prevAdmin => {
            return {
                ...prevAdmin,
                [name]: value
            };
        });
    }

    const onSubmit = async() => {
        setLoading(true);
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        console.log(adminInfo);
        try {
            const response = await fetch("http://localhost:5000/update-admin", {
                method:"PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Admin ${adminInfo.token}`
                },
                body:JSON.stringify(admin),
            })
            const result = await response.json();
            setAdminInfo(result);
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
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Name" name="name" value={admin.name} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Hospital Id" name="hospitalId" value={admin.hospitalId} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Mobile No" name="Mob" value={admin.Mob} />
                </div>
                <FormGroup className='gender-div'>
                    <label>Gender: </label>
                    <RadioGroup
                        name="gender"
                        
                    >
                        <div className='radio-btns'>
                            <FormControlLabel
                                value="Male"
                                control=<Radio />
                                label="Male" onChange={handleChange}
                                className='radio'
                            />
                            <FormControlLabel
                                value="Female"
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
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Age" name="age" value={admin.age} />
                </div>
                <div className='address-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Specialization" name="specialization" value={admin.specialization} />
                </div>
                <div className='name-div'>
                    <MuiTextField className="edit-profile-input" onChange={handleChange} label="Degree" name="degree" value={admin.degree} />
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