import { Formik, Form, Field } from 'formik';
import { Button, Box } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Dropzone from "react-dropzone";
import "./signup.css"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import database from "../database";
const root = "http://localhost:3000";

function AdminRegister() {

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Required';
        }else if (!/^[A-Za-z ]+$/i.test(values.name)) {
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
        if (!values.specialization) {
            errors.specialization = 'Required';
        }
        return errors;
    }
    const initialValues = {
        name: "",
        username: "",
        password: "",
        hospitalId: "",
        specialization: "",
        degree: "",
    };
    async function onSubmit(values, onSubmitProps) {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        console.log(formData);
        const savedAdminResponse = await fetch(
            "http://localhost:5000/admin/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedAdmin = await savedAdminResponse.json();
        localStorage.setItem("admin", JSON.stringify(savedAdmin));
        onSubmitProps.resetForm();
        window.location.href = root+"/admin";
    }

    return (
        <div className="register">
            <h1>Register on the admin portal to proceed.</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
                    <Form className='adminform-container'>
                        <label>Name: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                            {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                        </div>
                        <label>Medical UID: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Medical UID" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                            {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                        </div>
                        <label>Institution Id: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Institution Id" name="hospitalId" onBlur={() => setFieldTouched("hospitalId", true, true)} />
                            {errors.hospitalId && touched.hospitalId ? <div className='error'>{errors.hospitalId}</div> : null}
                        </div>
                        <label>Password: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                            {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                        </div>
                        <label>Specialization: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Specialization" name="specialization" onBlur={() => setFieldTouched("specialization", true, true)} />
                            {errors.specialization && touched.specialization ? <div className='error'>{errors.specialization}</div> : null}
                        </div>
                        <label>Degree: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Degree" name="degree" onBlur={() => setFieldTouched("degree", true, true)} />
                            {errors.degree && touched.degree ? <div className='error'>{errors.degree}</div> : null}
                        </div>
                        <div className='adminregister-div'>
                            <Button type="submit" id='submit-btn'>
                                Register
                            </Button>
                        </div>
                        <div className='goto-user-register'>
                            <Button href='/SignUp' type="submit" id='submit-btn'>
                                Patient Register? <ArrowForwardIcon />
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AdminRegister;
