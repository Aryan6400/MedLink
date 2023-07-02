import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup, Radio, Box, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Dropzone from "react-dropzone";
import "./signup.css"
import database from "../database";
const root = "http://localhost:3000";

function SignUp() {

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
        if (!values.age) {
            errors.age = 'Required';
        }
        if (!values.gender) {
            errors.gender = 'Required';
        }
        if (!values.Mob) {
            errors.Mob = 'Required';
        }
        if (!values.address) {
            errors.address = 'Required';
        }
        if (!values.state) {
            errors.state = 'Required';
        }
        if (!values.pincode) {
            errors.pincode = 'Required';
        }
        if (!values.DOB) {
            errors.DOB = 'Required';
        }
        if (!values.picture) {
            errors.picture = 'Required';
        }
        return errors;
    }
    const initialValues = {
        name: "",
        username: "",
        email: "",
        password: "",
        age: "",
        gender: null,
        Mob: "",
        address: "",
        pincode: "",
        state: "",
        DOB: "",
        picture: "",
    };
    async function onSubmit(values, onSubmitProps) {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const savedUserResponse = await fetch(
            "http://localhost:5000/auth/register",
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        localStorage.setItem("patient", JSON.stringify(savedUser));
        onSubmitProps.resetForm();
        window.location.href = root;
    }

    return (
        <div className="register">
            <h1>Register on the portal to proceed.</h1>
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
                    <Form className='signup-container'>

                        <label>Name: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                            {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                        </div>
                        <label>Aadhar No: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Aadhar No" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                            {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                        </div>
                        <label>Email: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Email" name="email" onBlur={() => setFieldTouched("email", true, true)} />
                            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}
                        </div>
                        <label>Password: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Password" name="password" onBlur={() => setFieldTouched("password", true, true)} />
                            {errors.password && touched.password ? <div className='error'>{errors.password}</div> : null}
                        </div>
                        <label>Age: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Age" name="age" onBlur={() => setFieldTouched("age", true, true)} />
                            {errors.age && touched.age ? <div className='error'>{errors.age}</div> : null}
                        </div>

                        <label>Gender: </label>
                        <div className='signup-gender-div'>
                            <Field name="gender">
                                {({ field }) => (
                                    <FormGroup className='input'>
                                        <RadioGroup
                                            {...field}
                                            name="gender"
                                            onBlur={() => setFieldTouched("gender", true, true)}
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
                                )}
                            </Field>
                            {errors.gender && touched.gender ? <div className='error'>{errors.gender}</div> : null}
                        </div>
                        <label>Mobile No: </label>
                        <div className='name-div'>
                            <Field as={TextField} className="input" label="Mob" name="Mob" onBlur={() => setFieldTouched("Mob", true, true)} />
                            {errors.Mob && touched.Mob ? <div className='error'>{errors.Mob}</div> : null}
                        </div>
                        <label>Address: </label>
                        <div className='address-div'>
                            <Field as={TextField} className="input" label="Address" name="address" multiline rows={2} onBlur={() => setFieldTouched("address", true, true)} />
                            {errors.address && touched.address ? <div className='error'>{errors.address}</div> : null}
                        </div>
                        <label>State: </label>
                        <div className='address-div'>
                            <Field as={TextField} className="input" label="State" name="state" onBlur={() => setFieldTouched("state", true, true)} />
                            {errors.state && touched.state ? <div className='error'>{errors.state}</div> : null}
                        </div>
                        <label>Pincode: </label>
                        <div className='name-div'>
                            <Field as={TextField} className="input" label="Pincode" name="pincode" onBlur={() => setFieldTouched("pincode", true, true)} />
                            {errors.pincode && touched.pincode ? <div className='error'>{errors.pincode}</div> : null}
                        </div>

                        <label>DOB: </label>
                        <div className='address-div'>
                            <Field as={TextField} className="input" label="DD-MM-YYYY" name="DOB" onBlur={() => setFieldTouched("DOB", true, true)} />
                            {errors.DOB && touched.DOB ? <div className='error'>{errors.DOB}</div> : null}
                        </div>

                        <Box className="dropzone">
                            <Dropzone
                                acceptedFiles=".jpg,.jpeg,.png"
                                multiple={false}
                                onDrop={(acceptedFiles) =>
                                    setFieldValue("picture", acceptedFiles[0])
                                }
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <Box
                                        {...getRootProps()}
                                        p="1rem"
                                        sx={{ "&:hover": { cursor: "pointer" } }}
                                    >
                                        <input {...getInputProps()} />
                                        {!values.picture ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <p>{values.picture.name}</p>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <div className='signup-div'>
                            <Button type="submit" id='submit-btn'>
                                Register
                            </Button>
                        </div>

                        <div className='goto-admin-register'>
                            <Button href='/admin-signUp' type="submit" id='submit-btn'>
                                Admin Register? <ArrowForwardIcon />
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default SignUp;
