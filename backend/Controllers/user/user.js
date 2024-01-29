import User from "../../models/patient.js";

const getUser = async(req,res) => {
    try {
        const foundUser = await User.findById(req.userId);
        res.status(200).json(foundUser);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const updateUser = async(req,res) => {
    const {
        name,
        email,
        age,
        gender,
        Mob,
        address,
        pincode,
        DOB,
    } = req.body;
    const data = {
        name,
        email,
        name,
        email,
        age: age!="" ? age : null,
        gender,
        Mob,
        address,
        pincode,
        DOB,
    };
    try {
        const newUser = await User.findByIdAndUpdate(req.userId, data, {new:true});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

const updatePic = async(req,res) => {
    try {
        const newUser = await User.findByIdAndUpdate(req.userId, {picturePath: req.body.picturePath}, {new:true});
        res.status(201).json(newUser);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export {getUser, updateUser, updatePic};