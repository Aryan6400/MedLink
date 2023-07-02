import { Navigate, Outlet } from "react-router-dom";


function AdminPrivateComponent() {
    const auth = localStorage.getItem("admin");
    return auth ? <Outlet /> : <Navigate to="/admin-signUp" />;
}

export default AdminPrivateComponent;