import { createContext, useContext, useEffect, useState } from "react";

const AdminInfoContext = createContext();

function AdminInfoProvider({children}){
    const [adminInfo, setAdminInfo] = useState({});
    
    useEffect(()=>{
        setAdminInfo((prev)=>prev);
    }, [])
    
    return (
        <AdminInfoContext.Provider value={{adminInfo, setAdminInfo}}>
            {children}
        </AdminInfoContext.Provider>
    )
}

export const useAdminInfo = () => {
    return useContext(AdminInfoContext);
}

export default AdminInfoProvider;