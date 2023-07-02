import { Formik, Form, Field } from 'formik';
import { Button } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import "./login.css"
import database from "../database";
const root = "http://localhost:3000";

function AdminLogin() {

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
        database.postData("http://localhost:5000/admin/login", values).then(data => {
            if (data[0].status) {
                const adminDetails = {
                    token: data[1],
                    username: data[2].username,
                    name: data[2].name,
                    degree: data[2].degree,
                    specialization: data[2].specialization,
                    hospitalId: data[2].hospitalId,
                    picturePath: data[2].picturePath
                    
                }
                console.log(data.name);
                localStorage.setItem("admin", JSON.stringify(adminDetails));
                onSubmitProps.resetForm();
                window.location.href = root+"/admin";
            }
        })
    }

    return (
        <div className="register">
            <h1>Login to proceed to Admin Portal.</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                {({ errors, touched, setFieldTouched }) => (
                    <Form className='adminlogin-container'>
                        <label>Medical Practitioner Id: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Medical Id" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                            {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                        </div>
                        <label>Password: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                            {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                        </div>
                        <div className='adminlogin-div'>
                            <Button type="submit" id='submit-btn'>
                                <AdminPanelSettingsIcon /> Login
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AdminLogin;
