import Prescription from "../models/prescription.js";

async function getPrescription(req, res){
    try{
        const {userId} = req.params;
        const foundPrescriptions = await Prescription.find({username: userId});
        res.send([{status:true}, foundPrescriptions]);
    }catch(err){
        res.send({error: err.message});
    }
}

async function createPrescription(req, res){
    try{
        const {adminId} = req.params;
        const {
            username,
            age,
            gender,
            name,
            picturePath,
            diagnosis,
            tests,
        } = req.body;
        const newPrescription = new Prescription({
            username,
            adminUsername,
            age,
            gender,
            name,
            picturePath,
            diagnosis,
            tests,
        })
        await newPrescription.save();
        const foundPrescriptions = await Prescription.find({username: adminId});
        res.send([{status: true}, foundPrescriptions]);
    }catch(err){
        res.send({error: err.message});
    }
}

export {getPrescription, createPrescription};