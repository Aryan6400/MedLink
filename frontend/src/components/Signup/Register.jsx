import { Formik, Form, Field } from 'formik';
import { TextField, Button, Paper } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import Grow from '@mui/material/Grow';
import { Link, useNavigate } from 'react-router-dom';
import "./signup.css";
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Backdrop, CircularProgress } from "@mui/material";
import { useAuth } from '../../context/AuthContext';

function SignUp() {
    const [showPassword, setShowPassword] = useState(false);
    const [picture, setPic] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setPatient} = useAuth();

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }
        else if (!/^[A-Za-z ]+$/i.test(values.name)) {
            errors.name = 'Invalid Name!';
        }
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.email) {
            errors.email = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        if (!values.Mob) {
            errors.Mob = 'Required';
        }
        return errors;
    }
    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: "",
        Mob: "",
    };

    const PostDetails = async (pic) => {
        setLoading(true);
        try {
            if (pic.type === "image/jpeg" || pic.type === "image/png") {
                const data = new FormData();
                data.append("file", pic);
                data.append("upload_preset", "HealthGen");
                data.append("cloud_name", "dfj3rhjvl");
                const response = await fetch("https://api.cloudinary.com/v1_1/dfj3rhjvl/image/upload", {
                    method: "POST",
                    body: data,
                });
                const result = await response.json();
                console.log(result.url.toString());
                setPic(result.url.toString());
                setLoading(false);
            } else {
                alert("Please select an image!!");
                setLoading(false);
                return;
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }


    const onSubmit = async(values, onSubmitProps) => {
        setLoading(true);
        const data = {
            name: values.name,
            username: values.username,
            email: values.email,
            password: values.password,
            Mob: values.Mob,
            picturePath: picture
        }
        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(data)
            });
            const result = await res.json();
            onSubmitProps.resetForm();
            if(result.user){
                localStorage.setItem("patient", JSON.stringify(result));
                setPatient(true);
                setLoading(false);
                navigate("/home");
            }
            else{
                setLoading(false);
                alert(result.message);
            }
        } catch (error) {
            setLoading(false);
            console.error(error);
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
            <div className="register">
                <Grow in={{}} {...({ timeout: 250 })}>
                    <Paper elevation={6} id='signup-paper'>
                        <h2>Create your user account</h2>
                        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                            {({ errors, touched, setFieldTouched }) => (
                                <Form className='signup-container' autoComplete='off'>

                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                                        {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Aadhar No" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                                        {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                                    </div>
                                    <div className='name-div'>
                                        <Field as={MuiTextField} className="input" label="Email" name="email" onBlur={() => setFieldTouched("email", true, true)} />
                                        {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
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
                                        <Field as={TextField} className="input" label="Mobile No" name="Mob" onBlur={() => setFieldTouched("Mob", true, true)} />
                                        {errors.Mob && touched.Mob ? <div className='error'>{errors.Mob}</div> : null}
                                    </div>
                                    <div className='file-input-div'>
                                        <input type="file" accept="image/*" onChange={(e) => PostDetails(e.target.files[0])} id="form-picture" />
                                    </div>
                                    <div className='signup-div'>
                                        <Button type="submit" id='signup-btn'>
                                            Register
                                        </Button>
                                    </div>
                                    <div className='to-login-div'>
                                        <p>Already have an account?&nbsp;&nbsp; <Link to="/login">Login here</Link></p>
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

export default SignUp;
