import { Formik, Form, Field } from 'formik';
import { Button, Paper } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Backdrop, CircularProgress } from "@mui/material";
import "./login.css"
import { useAuth } from '../../context/AuthContext';

function Login() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const {setPatient} = useAuth();

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'Required';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    }

    const initialValues = {
        username: "",
        password: "",
    };

    const onSubmit = async (values, onSubmitProps) => {
        setLoading(true);
        try {
            const res = await fetch("https://medlink-ugwj.onrender.com/auth/login", {
                method: "POST",
                cache: "no-cache",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json",
                },
                redirect: "follow",
                referrerPolicy: "no-referrer",
                body: JSON.stringify(values)
            });
            const result = await res.json();
            onSubmitProps.resetForm();
            if(result.user){
                const currentTimestamp = new Date();
                const isoString = currentTimestamp.toISOString();
                localStorage.setItem("timestamp", JSON.stringify(isoString));
                localStorage.setItem("patient", JSON.stringify(result));
                setPatient(true);
                setLoading(false);
                navigate("/patient-scripts");
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
            <div className="login">
                <Paper elevation={6} id='login-paper'>
                    <h2>Login to proceed to Patient Portal.</h2>
                    <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                        {({ errors, touched, setFieldTouched }) => (
                            <Form className='login-container' autoComplete='off'>
                                <div className='name-div'>
                                    <Field as={MuiTextField} className="input" label="Aadhar No" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                                    {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                                </div>
                                <div className='name-div'>
                                    <div className='password-div'>
                                        <Field as={MuiTextField} type="password" className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                                    </div>
                                    {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                                </div>
                                <div className='login-div'>
                                    <Button type="submit" id='login-btn'>
                                        Login
                                    </Button>
                                </div>
                                <div className='to-register-div'>
                                    <p>Don't have an account?&nbsp;&nbsp; <Link to="/signup">Register here</Link></p>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </div>
        </>
    )
}

export default Login;
