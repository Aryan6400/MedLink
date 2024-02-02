import Symptom from "../../models/symptoms.js";


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
        res.status(401).json({message:error.message});
    }
}

const addSymptoms = async(req,res) => {
    try {
        console.log(req.body);
        const symptomList = req.body.symptoms.map(el=>({name:el.replace(/_/g, ' ')}));
        const result = await Symptom.create(symptomList);
        res.status(201).json(result);
    } catch (error) {
        res.status(401).json({message:error.message});
    }
}

export {searchSymptoms, addSymptoms};