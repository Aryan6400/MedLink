import { createContext, useContext, useEffect, useState } from "react";

const UserInfoContext = createContext();

function UserInfoProvider({children}){
    const [patientInfo, setPatientInfo] = useState({});
    
    useEffect(()=>{
        setPatientInfo((prev)=>prev);
    }, [])
    
    return (
        <UserInfoContext.Provider value={{patientInfo, setPatientInfo}}>
            {children}
        </UserInfoContext.Provider>
    )
}

export const useUserInfo = () => {
    return useContext(UserInfoContext);
}

export default UserInfoProvider;