import Prescription from "../models/prescription.js";

async function getAdminPrescription(req, res){
    try{
        const {adminId} = req.params;
        const foundPrescriptions = await Prescription.find({adminUsername: adminId});
        res.send([{status:true}, foundPrescriptions]);
    }catch(err){
        res.send({error: err.message});
    }
}

export {getAdminPrescription};