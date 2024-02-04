import { createContext, useContext, useEffect, useState } from "react";

const FormPageContext = createContext();

function FormPageProvider({children}){
    const [page, setPage] = useState(0);
    const [aiData, setAiData] = useState({
        age: "",
        gender: "",
        weight: "",
        height: "",
        city: "",
        smoking: "",
        alcohol: "",
        recentDiagnosis: "",
        hyperTension: "",
        diabetes: "",
        anxiety: "",
        asthama: ""
    });
    const [symptoms, setSymptoms] = useState([]);

    useEffect(()=>{
        setPage(prev=>prev);
    },[])

    return (
        <FormPageContext.Provider value={{page, setPage, aiData, setAiData, symptoms, setSymptoms}}>
            {children}
        </FormPageContext.Provider>
    )
}

export const usePage = () => {
    return useContext(FormPageContext);
}

export default FormPageProvider;