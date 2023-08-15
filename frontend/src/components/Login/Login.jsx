import { Formik, Form, Field } from 'formik';
import { Button, Paper } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./login.css"
import database from "../database";
const root = "http://localhost:3000";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
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
    function onSubmit(values, onSubmitProps) {
        database.postData("http://localhost:5000/auth/login", values).then(data => {
            console.log(data);
            if(data.user){
                localStorage.setItem("patient", JSON.stringify(data));
                onSubmitProps.resetForm();
                window.location.href = root+"/home";
            }
            else{
                alert(data.message);
            }
        })
    }

    return (

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
                                    <Field as={MuiTextField} type={showPassword ? "text" : "password"} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                                    {showPassword && <VisibilityOffIcon onClick={() => setShowPassword(false)} />}
                                    {!showPassword && <VisibilityIcon onClick={() => setShowPassword(true)} />}
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
    )
}

export default Login;
