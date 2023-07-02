import { Formik, Form, Field } from 'formik';
import { Button } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import "./login.css"
import database from "../database";
const root = "http://localhost:3000";

function Login() {

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
            const patientDetails = {
                token: data[0],
                username: data[1].username,
                name: data[1].name,
                picturePath: data[1].picturePath,
                email: data[1].email,
                age: data[1].age,
                gender: data[1].gender,
                Mob: data[1].Mob,
                address: data[1].address,
                DOB: data[1].DOB,
                state: data[1].state,
            }
            localStorage.setItem("patient", JSON.stringify(patientDetails));
            onSubmitProps.resetForm();
            window.location.href = root;
        })
    }

    return (
        <div className="register">
        <h1>Login to proceed to Patient Portal.</h1>
        <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
            {({ errors, touched, setFieldTouched }) => (
                <Form className='login-container'>
                    <label>Aadhar No: </label>
                    <div className='name-div'>
                        <Field as={MuiTextField} className="input" label="Aadhar No" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                        {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                    </div>
                    <label>Password: </label>
                    <div className='name-div'>
                        <Field as={MuiTextField} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                        {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                    </div>
                    <div className='login-div'>
                        <Button type="submit" id='submit-btn'>
                            Login
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
        </div>
    )
}

export default Login;
