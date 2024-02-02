import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminHeader() {
  const {patient, admin, setPatient, setAdmin} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    if(patient) localStorage.removeItem("patient");
    else if(admin) localStorage.removeItem("admin");
    setAdmin(false);
    setPatient(false);
    navigate("/login");
  }

  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link className="head-link" to={!admin ? "/home" : "/admin"}>MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
            <li className="nav-items">
              <Link className="nav-links" to="/admin">Home</Link>
            </li>
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            {admin && <li className="nav-items">
              <Link className="nav-links" to="/admin-profile">Profile</Link>
            </li>}
            {!admin && <li className="nav-items">
              <Link className="nav-links" to="/SignUp">SignUp</Link>
            </li>}
            {admin && <li className="nav-items">
              <Link onClick={logout} className="nav-links" to="/Login">LogOut</Link>
            </li>}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;