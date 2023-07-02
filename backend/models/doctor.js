import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    Mob: String,
    email: String,
    hospitalId: String,
    specialization: String,
    degree: String,
    picturePath: {
        type: String,
        default: ""
    },
})


const Admin = mongoose.model("Admin", adminSchema);

export { Admin };