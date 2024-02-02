import Prescription from "../../models/prescription.js";
import User from "../../models/patient.js";
import Admin from "../../models/doctor.js";

async function getPrescription(req, res){
    try{
        const foundPrescriptions = await Prescription.find({userId: req.userId}).populate("userId").populate("adminId");
        res.status(200).json(foundPrescriptions);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

async function createPrescription(req, res){
    const {
        username,
        picturePath,
        diagnosis,
        tests,
        diabetes,
        weight,
        height
    } = req.body;
    try{
        const patient = await User.findOne({username:username});
        if(!patient) res.status(400).json({message: "Patient doesn't exists!!"});
        const newPrescription = new Prescription({
            userId: patient._id,
            adminId: req.adminId,
            picturePath,
            diagnosis,
            tests,
            diabetes,
            weight,
            height
        });
        await newPrescription.save();
        res.status(201).json({status:"Success"});
    }catch(err){
        res.status(409).json({message: err.message});
    }
}

async function getAdminPrescription(req, res){
    try{
        const foundPrescriptions = await Prescription.find({adminId: req.adminId}).populate("userId").populate("adminId");
        res.status(200).json(foundPrescriptions);
    }catch(err){
        res.status(404).json({message: err.message});
    }
}

export {getPrescription, createPrescription, getAdminPrescription};