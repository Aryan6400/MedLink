import database from "../database";
import { Formik, Form, Field } from 'formik';
import { TextField, RadioGroup, Radio, Box, Button, FormControlLabel, FormGroup } from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Dropzone from "react-dropzone";
import "./prescription.css"
const root = "http://localhost:3000";


function AddPrescription(){

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
        if (!values.age) {
            errors.age = 'Required';
        }
        if (!values.gender) {
            errors.gender = 'Required';
        }
        if (!values.picturePath) {
            errors.picturePath = 'Required';
        }
        if(!values.diagnosis){
            errors.diagnosis = 'Required';
        }
        if(!values.tests){
            errors.tests = 'Required';
        }
        return errors;
    }
    const initialValues = {
        name: "",
        username: "",
        age: "",
        gender: "",
        picturePath: "",
        diagnosis: "",
        tests: ""
    };

    async function onSubmit(values, onSubmitProps) {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        console.log(formData);
        formData.append("picturePath", values.picture.name);
        let auth = localStorage.getItem("admin");
        auth = JSON.parse(auth);
        const adminId = auth.username;
        const savedUserResponse = await fetch(
            `http://localhost:5000/admin-${adminId}/create`,
            {
                method: "POST",
                body: formData,
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();
    }

    return(
        <div className="addPrescription">
            <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit} >
                {({ values, errors, touched, setFieldTouched, setFieldValue }) => (
                    <Form className='add-prescription'>

                        <label>Patient name: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Name" name="name" onBlur={() => setFieldTouched("name", true, true)} />
                            {errors.name && touched.name ? <div className='error'>{errors.name}</div> : null}
                        </div>
                        <label>Patient's Aadhar No: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Aadhar No" name="username" onBlur={() => setFieldTouched("username", true, true)} />
                            {errors.username && touched.username ? <div className='error'>{errors.username}</div> : null}
                        </div>
                        <label>Patient's age: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Age" name="age" onBlur={() => setFieldTouched("age", true, true)} />
                            {errors.age && touched.age ? <div className='error'>{errors.age}</div> : null}
                        </div>
                        <label>Patient's gender: </label>
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
                        <label>Diagnosis: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Diagnosis" name="diagnosis" onBlur={() => setFieldTouched("diagnosis", true, true)} />
                            {errors.diagnosis && touched.diagnosis ? <div className='error'>{errors.diagnosis}</div> : null}
                        </div>
                        <label>Tests: </label>
                        <div className='name-div'>
                            <Field as={MuiTextField} className="input" label="Tests" name="tests" onBlur={() => setFieldTouched("tests", true, true)} />
                            {errors.tests && touched.tests ? <div className='error'>{errors.tests}</div> : null}
                        </div>
                        <Box className="add-dropzone">
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
                                            <p>Add Prescription Here</p>
                                        ) : (
                                            <p>{values.picture.name}</p>
                                        )}
                                    </Box>
                                )}
                            </Dropzone>
                        </Box>
                        <div className='add-div'>
                            <Button type="submit" id='submit-btn'>
                                Add
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddPrescription;