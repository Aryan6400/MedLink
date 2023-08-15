import { Formik, Form, Field } from 'formik';
import { Button, Box, Paper, TextField } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import { Link } from 'react-router-dom';
import "./signup.css"
import { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Backdrop, CircularProgress } from "@mui/material";
import database from "../database";
const root = "http://localhost:3000";

function AdminRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        } else if (!/^[A-Za-z ]+$/i.test(values.name)) {
            errors.name = 'Invalid Name!';
        }
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.hospitalId) {
            errors.hospitalId = 'Required';
        }
        if (!values.Mob) {
            errors.Mob = 'Required';
        }
        return errors;
    }
    const initialValues = {
        name: "",
        username: "",
        password: "",
        hospitalId: "",
        Mob: "",
    };
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

    function onSubmit(values, onSubmitProps) {
        setLoading(true);
        const data = {
            name: values.name,
            username: values.username,
            hospitalId: values.hospitalId,
            password: values.password,
            Mob: values.Mob,
            picturePath: picture
        }
        database.postData("http://localhost:5000/admin/register", data).then((data) => {
            console.log(data);
            if(data.admin){
                localStorage.setItem("admin", JSON.stringify(data));
                onSubmitProps.resetForm();
                window.location.href = root + "/admin";
            }
            else {
                alert(data.message);
            }
        })
    }

    return (
        <>
            <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={isLoading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="admin-register">
                <Grow in={{}} {...({ timeout: 250 })}>
                    <Paper elevation={6} id='signup-paper'>
                        <h2>Create your admin account</h2>
                        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                            {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
                                <Form className='admin-signup-container' autoComplete='off'>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                                        {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Medical UID" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                                        {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Institution Id" name="hospitalId" onBlur={() => setFieldTouched("hospitalId", true, true)} />
                                        {errors.hospitalId && touched.hospitalId ? <div className='error'>{errors.hospitalId}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <div className='password-div'>
                                            <Field as={MuiTextField} type={showPassword ? "text" : "password"} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                                            {showPassword && <VisibilityOffIcon onClick={() => setShowPassword(false)} />}
                                            {!showPassword && <VisibilityIcon onClick={() => setShowPassword(true)} />}
                                        </div>
                                        {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Mobile No" name="Mob" onBlur={() => setFieldTouched("Mob", true, true)} />
                                        {errors.Mob && touched.Mob ? <div className='error'>{errors.Mob}</div> : null}
                                    </div>
                                    <div className='file-input-div'>
                                        <input type="file" accept="image/*" onChange={(e) => PostDetails(e.target.files[0])} id="form-picture" />
                                    </div>
                                    <div className='adminregister-div'>
                                        <Button type="submit" id='admin-signup-btn'>
                                            <AdminPanelSettingsIcon /> Register
                                        </Button>
                                    </div>
                                    <div className='to-admin-login-div'>
                                        <p>Already have an admin account?&nbsp;&nbsp; <Link to="/login">Login here</Link></p>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Grow>
            </div>
        </>
    )
}

export default AdminRegister;
