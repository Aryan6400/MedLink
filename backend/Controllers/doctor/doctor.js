import Admin from "../../models/doctor.js";

const getAdmin = async(req,res) => {
    try {
        const foundAdmin = await Admin.findById(req.adminId);
        res.status(200).json(foundAdmin);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const updateAdmin = async(req,res) => {
    const {
        name,
        hospitalId,
        Mob,
        degree,
        specialization,
        age,
        gender,
    } = req.body;
    const data = {
        name,
        hospitalId,
        Mob,
        degree,
        specialization,
        gender,
        age: age!="" ? age : null,
    };
    try {
        const newAdmin = await Admin.findByIdAndUpdate(req.adminId, data, {new:true});
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const updateAdminPic = async(req,res) => {
    try {
        const newAdmin = await Admin.findByIdAndUpdate(req.adminId, {picturePath: req.body.picturePath}, {new:true});
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export {getAdmin, updateAdmin, updateAdminPic};