import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  },
  picturePath : {
    type: String,
    default: ""
  },
  diagnosis: String,
  tests: String,
  diabetes: String,
  height: String,
  weight: String,
}, {timestamps:true}
)

const Prescription = mongoose.model("Prescription", prescriptionSchema);

export default Prescription;