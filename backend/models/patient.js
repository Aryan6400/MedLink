import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  name: String,
  Mob: String,
  picturePath : {
    type: String,
    default: ""
  },
  address: String,
  state: String,
  pincode: String,
  DOB: String,
}, {timestamps:true}
)

const User = mongoose.model("User", userSchema);

export default User;