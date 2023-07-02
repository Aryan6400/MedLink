import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  username: String,
  adminUsername: String,
  age: Number,
  gender: String,
  name: String,
  picturePath : {
    type: String,
    default: ""
  },
  diagnosis: [String],
  tests: [String],
}, {timestamps:true}
)

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;