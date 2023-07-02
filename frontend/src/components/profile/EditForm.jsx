import { useState } from "react";
import database from "../database";
import { RadioGroup, Radio, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';


function EditForm(props) {
    const [user, setUser] = useState({
        name: props.user.name,
        email: props.user.email,
        age: props.user.age,
        gender: props.user.gender,
        Mob: props.user.Mob,
        address: props.user.address,
        state: props.user.state,
        pincode: props.user.pincode,
        DOB: props.user.DOB,
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
    function onSubmit() {
        database.patchData(`http://localhost:5000/user-${props.user.username}`, user).then(data => {
            if (data[0].status) {
                props.updateInformation(data[1]);
                props.onClick();
            }
        })
    }
    function Close() {
        props.onClick();
    }

    return (
        <div>
            <form className="edit-form">

                <div className='name-div'>
                    <label>Name: </label>
                    <MuiTextField className="input" onChange={handleChange} label="Name" name="name" value={user.name} />
                </div>

                <div className='name-div'>
                    <label>Email: </label>
                    <MuiTextField className="input" onChange={handleChange} label="Email" name="email" value={user.email} />
                </div>

                <div className='name-div'>
                    <label>Mobile No: </label>
                    <MuiTextField className="input" onChange={handleChange} label="Mobile No" name="Mob" value={user.Mob} />
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
                    <label>Age: </label>
                    <MuiTextField className="input" onChange={handleChange} label="Age" name="age" value={user.age} />
                </div>

                <div className='name-div'>
                    <label>Address: </label>
                    <MuiTextField className="input" onChange={handleChange} multiline rows={2} label="Address" name="address" value={user.address} />
                </div>

                <div className='name-div'>
                    <label>State: </label>
                    <MuiTextField className="input" onChange={handleChange} label="State" name="state" value={user.state} />
                </div>

                <div className='name-div'>
                    <label>Pincode: </label>
                    <MuiTextField className="input" onChange={handleChange} label="Pincode" name="pincode" value={user.pincode} />
                </div>

                <div className='name-div'>
                    <label>DOB: </label>
                    <MuiTextField className="input" onChange={handleChange} label="DOB" name="DOB" value={user.DOB} />
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