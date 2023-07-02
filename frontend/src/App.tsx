import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login/Login';
import AdminLogin from "./components/Login/AdminLogin";
import SignUp from './components/Signup/Register';
import AdminRegister from "./components/Signup/AdminRegister";
import PrivateComponent from "./components/privateComponents/privateComponent";
import AdminPrivateComponent from "./components/privateComponents/AdminPrivateComponent";
import Home from "./components/Home/Home";
import Admin from "./components/admin/Admin";
import Header from "./components/Home/Header";
import UserProfile from "./components/profile/UserProfile";
import AdminHeader from "./components/admin/AdminHeader";
import AddPrescription from "./components/Admin Components/AddPrescription";

function App() {
  const auth = localStorage.getItem("admin");
  return (
    <div>
      <BrowserRouter>
        {auth ? <AdminHeader /> : <Header />}
        <Routes>

          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Route>

          <Route element={<AdminPrivateComponent />}>
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add" element={ <AddPrescription /> } />
          </Route>

          <Route path="/Login" element={<div>
            <Login />
            <AdminLogin />
          </div>} />


          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/admin-signUp" element={<AdminRegister />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
