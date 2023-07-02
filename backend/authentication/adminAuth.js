import { Admin } from "../models/doctor.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const dirname = "C:/Users/Lenovo/Desktop/Mercor/server";

async function adminRegister(req, res) {
    try{
        const {
            username,
            password,
            name,
            Mob,
            email,
            hospitalId,
            specialization,
            degree,
            picturePath
        } = req.body;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newPicturePath = dirname + picturePath;
        const newAdmin = new Admin({
            username,
            password: hashedPassword,
            name,
            Mob,
            email,
            hospitalId,
            specialization,
            degree,
            picturePath: newPicturePath
        })
        const savedAdmin = await newAdmin.save();
        res.send(savedAdmin);
    } catch(err){
        res.send({error: err.message})
    }
}

async function adminLogin(req, res) {
    try{
        const { username, password } = req.body;
        const foundAdmin = await Admin.findOne({username:username});
        if(!foundAdmin) res.send({status: false, error: "Admin does not exist!"});
        const passwordMatched = await bcrypt.compare(password, foundAdmin.password);
        if(!passwordMatched) res.send({status: false, error: "Incorrect Password!"});
        
        const token = jwt.sign({id: foundAdmin._id}, process.env.JWT_SECRET)
        delete username.password;
        res.send([{status:true}, token, foundAdmin]);
    } catch(err){
        console.log("Error");
        res.send({status:false, error: err.message})
    }
}

function adminLogout(req, res){
    
}

export { adminRegister, adminLogin, adminLogout };