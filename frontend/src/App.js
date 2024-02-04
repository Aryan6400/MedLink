import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import PrivateComponent from "./components/PrivateComponents/PrivateComponent";
import AdminPrivateComponent from "./components/PrivateComponents/AdminPrivateComponent";
import Header from "./components/Home/Header";
import AdminHeader from "./components/Admin/AdminHeader";
import { useAuth } from "./context/AuthContext";
import { Backdrop, CircularProgress } from "@mui/material";
import "./App.css";
const SignUp = lazy(() => import('./components/Signup/Register'));
const AdminRegister = lazy(() => import("./components/Signup/AdminRegister"));
const Home = lazy(() => import("./components/Home/Home"));
const Admin = lazy(() => import("./components/Admin/Admin"));
const UserProfile = lazy(() => import("./components/UserProfile/UserProfile"));
const AddPrescription = lazy(() => import("./components/AdminComponents/AddPrescription"));
const About = lazy(() => import("./components/About/About"));
const AdminProfile = lazy(() => import("./components/AdminProfile/AdminProfile"));
const AIAssist = lazy(() => import("./components/AIAssist/AIAssist"));
const Login = lazy(() => import("./components/Login/Login"));
const AdminLogin = lazy(() => import("./components/Login/AdminLogin"));


function App() {
  const { admin } = useAuth();
  return (
    <BrowserRouter>
      {admin ? <AdminHeader /> : <Header />}

      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/med-bot" element={
          <Suspense fallback={
            <Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>
          }>
            <AIAssist />
          </Suspense>
        } />
        <Route path="/about" element={
          <Suspense fallback={<Backdrop
            sx={{ color: "#fff", zIndex: 5 }}
            open={true}
          >
            <CircularProgress color="secondary" />
          </Backdrop>}>
            <About />
          </Suspense>
        } />
        <Route path="/login" element={
          <div className="login-page">
            <Suspense fallback={
              <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={true}
              >
                <CircularProgress color="secondary" />
              </Backdrop>
            }>
              <Login />
            </Suspense>
            <div className="vertical-line"></div>
            <Suspense fallback={
              <Backdrop
                sx={{ color: "#fff", zIndex: 5 }}
                open={true}
              >
                <CircularProgress color="secondary" />
              </Backdrop>
            }>
              <AdminLogin />
            </Suspense>
          </div>
        } />
        <Route path="/signup" element={
          <div className="signup-page">
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <SignUp />
            </Suspense>
            <div className="vertical-line"></div>
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <AdminRegister />
            </Suspense>
          </div>
        } />
        <Route element={<PrivateComponent />}>
          <Route path="/patient-scripts" element={
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <Home />
            </Suspense>
          } />
          <Route path="/user-profile" element={
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <UserProfile />
            </Suspense>
          } />
        </Route>
        <Route element={<AdminPrivateComponent />}>
          <Route path="/admin-scripts" element={
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <Admin />
            </Suspense>
          } />
          <Route path="/admin-profile" element={
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <AdminProfile />
            </Suspense>
          } />
          <Route path="/admin/add" element={
            <Suspense fallback={<Backdrop
              sx={{ color: "#fff", zIndex: 5 }}
              open={true}
            >
              <CircularProgress color="secondary" />
            </Backdrop>}>
              <AddPrescription />
            </Suspense>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
