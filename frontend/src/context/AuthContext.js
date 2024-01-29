import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider({children}){
    const [patient, setPatient] = useState(false);
    const [admin, setAdmin] = useState(false);
    
    useEffect(()=>{
        setPatient((prev)=>prev);
        setAdmin((prev)=>prev);
    }, [])

    useEffect(()=>{
        const patient=localStorage.getItem("patient");
        const admin=localStorage.getItem("admin");

        if(patient) setPatient(true);
        if(admin) setAdmin(true);
    },[])
    
    return (
        <AuthContext.Provider value={{patient, setPatient, admin, setAdmin}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;