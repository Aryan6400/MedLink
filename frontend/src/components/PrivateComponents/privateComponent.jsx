import { Navigate, Outlet } from "react-router-dom";


function PrivateComponent() {
    const auth = localStorage.getItem("patient");
    return auth ? <Outlet /> : <Navigate to="/SignUp" />;
}

export default PrivateComponent;