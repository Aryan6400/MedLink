import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import { register, login, logout } from "./authentication/userAuth.js";
import { adminRegister, adminLogin, adminLogout } from "./authentication/adminAuth.js";
import { getPrescription, createPrescription } from "./Controllers/prescription.js";
import { getAdminPrescription } from "./Controllers/adminPrescriptions.js";
import User from "./models/patient.js";
import Prescription from "./models/prescription.js";
import { Admin } from "./models/doctor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

mongoose.connect('mongodb://127.0.0.1:27017/MedicalDB', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  }).catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get("/", (req, res) => {
  res.send("Connected");
})

app.get("/user-:username", (req, res) => {
  User.find({ username: req.params.username }).exec().then((founduser) => {
    res.send(founduser[0]);
  })
})

app.get("/admin-:adminUsername", (req, res) => {
  Admin.find({ username: req.params.adminUsername }).exec().then((founduser) => {
    res.send(founduser[0]);
  })
})

app.patch("/user-:username", (req, res) => {
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

app.get("/user-:userId/history", getPrescription);

app.get("/admin-:adminId/history", getAdminPrescription);

app.post("/admin-:adminId/create", upload.single("picture"), createPrescription);


app.post("/auth/register", upload.single("picture"), register);

app.post("/auth/login", login);

app.get("/auth/logout", logout);

app.post("/admin/register", adminRegister);

app.post("/admin/login", adminLogin);

app.get("/admin/logout", adminLogout);

app.listen(5000, () => {
  console.log("Sever listening on port 5000!");
})