import { Box, Button, Backdrop, CircularProgress } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import "./prescription.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


function AddPrescription() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: "",
        diagnosis: "",
        tests: "",
        diabetes: "",
        weight: "",
        height: ""
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
        if (data.username == "" || data.diagnosis == "" || data.tests == "" || data.diabetes == "" || data.height == "" || data.weight == "" || picture == "") {
            alert("Fill in all the details!");
            return;
        }
        setLoading(true);
        const adminInfo = JSON.parse(localStorage.getItem("admin"));
        const presData = {
            username: data.username,
            diagnosis: data.diagnosis,
            tests: data.tests,
            diabetes: data.diabetes,
            weight: data.weight,
            height: data.height,
            picturePath: picture
        }
        try {
            const savedPrescriptionResponse = await fetch("https://medlink-ugwj.onrender.com/admin/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Admin ${adminInfo.token}`
                },
                body: JSON.stringify(presData),
            });
            const savedPrescription = await savedPrescriptionResponse.json();
            if (savedPrescription.status) {
                event.preventDefault();
                setData({
                    username: "",
                    diagnosis: "",
                    tests: "",
                    diabetes: "",
                    weight: "",
                    height: ""
                })
                setPic("");
                navigate("/admin-scripts");
                setLoading(false);
            }
            else {
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
                    <label>Patient's Aadhar No: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Aadhar No" name="username" onChange={handleChange} value={data.username} />
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
                    <label>Height: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Height" name="height" onChange={handleChange} value={data.height} />
                    </div>
                    <label>Weight: </label>
                    <div className='name-div'>
                        <MuiTextField className="add-prescription-input" label="Weight" name="weight" onChange={handleChange} value={data.weight} />
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