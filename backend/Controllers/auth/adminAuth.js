import Admin from "../../models/doctor.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

async function adminRegister(req, res) {
    const {
        name,
        username,
        password,
        hospitalId,
        Mob,
        picturePath,
    } = req.body;
    try {
        const foundAdmin = await Admin.findOne({username:username});
        if(foundAdmin) return res.status(400).json({message: "Admin already exist!"});
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({
            name,
            username,
            password: hashedPassword,
            hospitalId,
            Mob,
            picturePath,
        })
        const savedAdmin = await newAdmin.save();
        const token = jwt.sign({id: savedAdmin._id}, process.env.ADMIN_SECRET, {expiresIn:"24hr"});
        res.status(201).json({token: token, admin: savedAdmin});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function adminLogin(req, res) {
    const { username, password } = req.body;
    try {
        const foundAdmin = await Admin.findOne({ username: username });
        if (!foundAdmin) return res.status(404).json({message: "Admin doesn't exist!"});
        const passwordMatched = await bcrypt.compare(password, foundAdmin.password);
        if (!passwordMatched) return res.status(400).json({message: "Invalid Credentials!"});

        const token = jwt.sign({ id: foundAdmin._id }, process.env.ADMIN_SECRET)
        res.status(200).json({token: token, admin: foundAdmin});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

function adminLogout(req, res) {

}

export { adminRegister, adminLogin, adminLogout };