import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { register, login, logout } from "./Controllers/auth/userAuth.js";
import { adminRegister, adminLogin, adminLogout } from "./Controllers/auth/adminAuth.js";
import { getPrescription, createPrescription, getAdminPrescription } from "./Controllers/prescription/prescription.js";
import User from "./models/patient.js";
import auth from "./middleware/auth.js";
import Prescription from "./models/prescription.js";
import { Admin } from "./models/doctor.js";
import { getUser, updatePic, updateUser } from "./Controllers/user/user.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


mongoose.connect('mongodb+srv://SinghAryan:Aryan6400@cluster0.ilp3vu7.mongodb.net/MedicalDB', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });



app.get("/admin-:adminUsername", auth, (req, res) => {
  Admin.find({ username: req.params.adminUsername }).exec().then((founduser) => {
    res.send(founduser[0]);
  })
})

app.patch("/user-:username", auth, (req, res) => {
  console.log(req.params.username);
  const {
    name,
    email,
    age,
    gender,
    Mob,
    address,
    state,
    pincode,
    DOB
  } = req.body;
  User.findOneAndUpdate({ username: req.params.username }, {$set : {
    name:name,
    email:email,
    age:age,
    gender:gender,
    Mob:Mob,
    address:address,
    state:state,
    pincode:pincode,
    DOB:DOB
  }}).exec().then(()=>{
    User.find({ username: req.params.username }).exec().then((founduser) => {
      res.send([{status:true}, founduser[0]]);
    })
  });
})

app.get("/user", auth, getUser);
app.patch("/update-user", auth, updateUser);
app.patch("/update-user-picture", auth, updatePic);

app.get("/user-:userId/history", auth, getPrescription);
app.get("/admin/history", auth, getAdminPrescription);
app.post("/admin/create", auth, createPrescription);


app.post("/auth/register", register);
app.post("/auth/login", login);
app.get("/auth/logout", logout);

app.post("/admin/register", adminRegister);
app.post("/admin/login", adminLogin);
app.get("/admin/logout", adminLogout);

app.listen(5000, () => {
  console.log("Sever listening on port 5000!");
})