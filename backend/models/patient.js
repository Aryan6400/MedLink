import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  Mob: String,
  picturePath : {
    type: String,
    default: ""
  },
  address: String,
  pincode: String,
  DOB: String,
}, {timestamps:true}
)

const User = mongoose.model("User", userSchema);

export default User;