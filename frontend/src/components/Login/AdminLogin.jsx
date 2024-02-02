import { Formik, Form, Field } from 'formik';
import { Button, Paper } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./login.css"
import { useAuth } from '../../context/AuthContext';

function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setAdmin} = useAuth();
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

    const onSubmit = async(values, onSubmitProps) => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/admin/login", {
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
            if(result.admin){
                localStorage.setItem("admin", JSON.stringify(result));
                setAdmin(true);
                setLoading(false);
                navigate("/admin");
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
        <div className="admin-login">
            <Paper elevation={6} id='login-paper'>
                <h2>Login to proceed to Admin Portal.</h2>
                <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                    {({ errors, touched, setFieldTouched }) => (
                        <Form className='adminlogin-container' autoComplete='off'>
                            <div className='name-div'>
                                <Field as={MuiTextField} className="input" label="Medical Id" name="username" onBlur={() => setFieldTouched("username", true, true)} />
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
                            <div className='adminlogin-div'>
                                <Button type="submit" id='admin-login-btn'>
                                    <AdminPanelSettingsIcon /> Login
                                </Button>
                            </div>
                            <div className='to-admin-register-div'>
                                <p>Don't have an admin account?&nbsp;&nbsp; <Link to="/signup">Register here</Link></p>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Paper>
        </div>
    )
}

export default AdminLogin;
