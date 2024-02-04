import Symptom from "../../models/symptoms.js";
import { HfInference } from "@huggingface/inference";
import fs from 'fs/promises';

const HF_ACCESS_TOKEN = process.env.HUGGING_FACE_TOKEN;
const inference = new HfInference(HF_ACCESS_TOKEN);
const model = "DATEXIS/CORe-clinical-diagnosis-prediction"

const jsonString = await fs.readFile('data/codes.json', 'utf8');
const codeLabels = JSON.parse(jsonString);


async function searchSymptoms(req, res) {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
            ]
        }
        : {};
    try {
        const result = await Symptom.find(keyword).limit(5);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const addSymptoms = async (req, res) => {
    try {
        console.log(req.body);
        const symptomList = req.body.symptoms.map(el => ({ name: el.replace(/_/g, ' ') }));
        const result = await Symptom.create(symptomList);
        res.status(201).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

const predict = async (req, res) => {
    const presentIlless = "PRESENT ILLNESS: "+req.body.text;
    let chiefComplaint = "CHIEF COMPLAINT: ";
    req.body.symptoms.map((el, index)=>{
        if(index==0) chiefComplaint=chiefComplaint+el;
        else chiefComplaint=chiefComplaint+", "+el;
    })
    try {
        const result = await inference.textClassification({
            model: model,
            data: chiefComplaint+"\n\n"+presentIlless
        });
        let sum = 0;
        const unique = {};
        const labels = result.filter((el) => {
            if (el.label.length > 3) el.label = el.label.slice(0, 3);
            if (el.score > 0.3 && !isNaN(el.label)) {
                if (!unique[el.label]) {
                    unique[el.label] = true;
                    sum = sum + el.score;
                    return el;
                }
            }
        })
        const final = labels.map((el) => {
            return { label: codeLabels[el.label], score: (el.score * 100) / sum };
        })
        res.status(201).json(final);
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}

export { searchSymptoms, addSymptoms, predict };