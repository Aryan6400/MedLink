import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: String,
    username: String,
    password: String,
    Mob: String,
    hospitalId: String,
    specialization: String,
    degree: String,
    picturePath: {
        type: String,
        default: ""
    },
    gender: String,
    age: Number,
}, {timestamps:true})


const Admin = mongoose.model("Admin", adminSchema);

export default Admin;