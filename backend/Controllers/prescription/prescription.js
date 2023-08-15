import Prescription from "../../models/prescription.js";
import User from "../../models/patient.js";

async function getPrescription(req, res){
    const {userId} = req.params;
    try{
        const foundPrescriptions = await Prescription.find({username: userId});
        res.status(200).json(foundPrescriptions);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

async function createPrescription(req, res){
    const adminId = req.adminId;
    console.log(adminId);
    const {
        name,
        username,
        age,
        gender,
        picturePath,
        diagnosis,
        tests,
        diabetes,
    } = req.body;
    try{
        const newPrescription = new Prescription({
            name,
            username,
            adminUsername: adminId,
            age,
            gender,
            picturePath,
            diagnosis,
            tests,
            diabetes,
        });
        const patientExixts = await User.find({username:username});
        if(!patientExixts) res.status(400).json({message: "Patient doesn't exists!!"});
        else if(patientExixts[0].name != name ) res.status(400).json({message: "Invalid patient details!!"});
        else {
            await newPrescription.save();
            res.status(201).json({status: "Success"});
        }
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

async function getAdminPrescription(req, res){
    const adminId = req.adminId;
    try{
        const foundPrescriptions = await Prescription.find({adminUsername: adminId});
        res.status(200).json(foundPrescriptions);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export {getPrescription, createPrescription, getAdminPrescription};