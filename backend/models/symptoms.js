import mongoose from "mongoose";

const symptomSchema = new mongoose.Schema({
  name: String
})

const Symptom = mongoose.model("Symptom", symptomSchema);

export default Symptom;