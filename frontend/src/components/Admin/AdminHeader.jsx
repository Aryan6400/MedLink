import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AdminHeader() {
  const {patient, admin, setPatient, setAdmin} = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    if(patient) localStorage.removeItem("patient");
    else if(admin) localStorage.removeItem("admin");
    localStorage.removeItem("timestamp")
    setAdmin(false);
    setPatient(false);
    navigate("/login");
  }

  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link className="head-link" to="/">MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
            {admin && <li className="nav-items">
              <Link className="nav-links" to="/admin-scripts">MEDScript</Link>
            </li>}
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            {admin && <li className="nav-items">
              <Link className="nav-links" to="/admin-profile">Profile</Link>
            </li>}
            {!admin && <li className="nav-items">
              <Link className="nav-links" to="/login">Login</Link>
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