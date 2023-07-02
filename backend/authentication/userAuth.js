import User from "../models/patient.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const dirname = "C:/Users/Lenovo/Desktop/Mercor/server";


async function register(req, res){
    try{
        const {
            username,
            password,
            age,
            gender,
            name,
            Mob,
            address,
            pincode,
            DOB,
            email,
            state,
            picturePath
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPicturePath = dirname + picturePath;
        const newUser = new User({
            username,
            password: hashedPassword,
            age,
            gender,
            name,
            Mob,
            address,
            pincode,
            DOB,
            email,
            state,
            picturePath: newPicturePath
        })
        const savedUser = await newUser.save();
        res.send(savedUser);
    } catch(err){
        res.send({error: err.message})
    }
}

async function login(req, res) {
    try{
        const { username, password } = req.body;
        const foundUser = await User.findOne({username:username});
        if(!foundUser) res.send({status: false, error: "User does not exist!"});
        const passwordMatched = await bcrypt.compare(password, foundUser.password);
        if(!passwordMatched) res.send({status: false, error: "Incorrect Password!"});
        
        const token = jwt.sign({id: foundUser._id}, process.env.JWT_SECRET)
        delete username.password;
        res.send([token, foundUser]);
    } catch(err){
        res.send({status:false, error: err.message})
    }
}

function logout(req, res){
    
}

export { register, login, logout };