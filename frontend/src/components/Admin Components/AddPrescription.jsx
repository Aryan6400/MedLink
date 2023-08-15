import database from "../database";
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup, Radio, Box, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Backdrop, CircularProgress } from "@mui/material";
import Dropzone from "react-dropzone";
import "./prescription.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const root = "https://mercor-medlink.netlify.app";


function AddPrescription() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        username: "",
        age: "",
        gender: "",
        diagnosis: "",
        tests: "",
        diabetes: "",
    })

    const [picture, setPic] = useState("");
    const [isLoading, setLoading] = useState(false);

    const PostDetails = (pic) => {
        setLoading(true);
        if (pic.type === "image/jpeg" || pic.type === "image/png") {
            const data = new FormData();
            data.append("file", pic);
            data.append("upload_preset", "HealthGen");
            data.append("cloud_name", "dfj3rhjvl");
            fetch("https://api.cloudinary.com/v1_1/dfj3rhjvl/image/upload", {
                method: "POST",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setPic(data.url.toString());
                    setLoading(false);
                }).catch(error => {
                    console.log(error);
                    setLoading(false);
                })
        } else {
            alert("Please select an image!!");
            return;
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    async function handleSubmit(event) {
        if(data.name== "" || data.username== "" || data.age== "" || data.gender== "" || data.picturePath== "" || data.diagnosis== "" || data.tests== "" || data.diabetes== "" || picture == "") {
            alert("Fill in all the details!");
            return;
        }
        setLoading(true);
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        const presData = {
            name: data.name,
            username: data.username,
            age: data.age,
            gender: data.gender,
            diagnosis: data.diagnosis,
            tests: data.tests,
            diabetes: data.diabetes,
            picturePath: picture,
        }
        try {
            const savedPrescriptionResponse = await fetch(
                "http://localhost:5000/admin/create",
                {
                    method: "POST",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: `Admin ${adminInfo.token}`
                    },
                    redirect: "follow",
                    referrerPolicy: "no-referrer",
                    body: JSON.stringify(presData),
                }
            );
            const savedPrescription = await savedPrescriptionResponse.json();
            if(savedPrescription.status){
                event.preventDefault();
                setData({
                    name: "",
                    username: "",
                    age: "",
                    gender: "",
                    diagnosis: "",
                    tests: "",
                    diabetes: "",
                })
                navigate("/admin");
                setLoading(false);
            }
            else{
                event.preventDefault();
                setLoading(false);
                alert(savedPrescription.message);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="addPrescription">
                <form className='add-prescription'>

                    <label>Patient name: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Name" name="name" onChange={handleChange} value={data.name} />
                    </div>
                    <label>Patient's Aadhar No: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Aadhar No" name="username" onChange={handleChange} value={data.username} />
                    </div>
                    <label>Patient's age: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Age" name="age" onChange={handleChange} value={data.age} />
                    </div>
                    <label>Patient's gender: </label>
                    <div className='signup-gender-div'>
                        <FormGroup className='add-prescription-input'>
                            <RadioGroup
                                name="gender"
                                onChange={handleChange}
                            >
                                <div className='radio-btns'>
                                    <FormControlLabel
                                        value="male"
                                        control=<Radio />
                                        label="Male"
                                        className='radio'
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control=<Radio />
                                        label="Female"
                                        className='radio'
                                    />
                                    <FormControlLabel
                                        value="other"
                                        control=<Radio />
                                        label="Rather Not Say"
                                        className='radio'
                                    />
                                </div>
                            </RadioGroup>
                        </FormGroup>
                    </div>
                    <label>Diagnosis: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Diagnosis" name="diagnosis" onChange={handleChange} value={data.diagnosis} />
                    </div>
                    <label>Tests: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Tests" name="tests" onChange={handleChange} value={data.tests} />
                    </div>
                    <label>Diabetes: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Diabetes" name="diabetes" onChange={handleChange} value={data.diabetes} />
                    </div>
                    <Box className="add-dropzone">
                        <input type="file" accept="image/*" onChange={(e) => PostDetails(e.target.files[0])} id="prescription-picture-input" />
                    </Box>
                    <Button onClick={handleSubmit} id='add-prescription-btn'>
                        Add
                    </Button>
                </form>
            </div>
        </>
    )
}

export default AddPrescription;