import { Navigate, Outlet } from "react-router-dom";


function AdminPrivateComponent() {
    const auth = localStorage.getItem("admin");
    return auth ? <Outlet /> : <Navigate to="/signUp" />;
}

export default AdminPrivateComponent;