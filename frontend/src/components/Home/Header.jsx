import { Link, useNavigate } from "react-router-dom";
import "./header.css"
import { useAuth } from "../../context/AuthContext";
import { usePage } from "../../context/FormPageContext";

function Header() {
  const { patient, setPatient, admin, setAdmin } = useAuth();
  const { setPage } = usePage();
  const navigate = useNavigate();

  function logout() {
    if (patient) localStorage.removeItem("patient");
    else if (admin) localStorage.removeItem("admin");
    localStorage.removeItem("timestamp");
    setAdmin(false);
    setPatient(false);
    navigate("/login");
  }

  return (
    <header>
      <div className="header-bar">
        <h1 className="head"><Link to="/" className="head-link">MedLink</Link></h1>
        <div className="navbar">
          <ul className="navbar-list">
            {patient && <li className="nav-items">
              <Link className="nav-links" to="/patient-scripts">MEDScript</Link>
            </li>}
            <li className="nav-items">
              <Link className="nav-links" to="/about">About</Link>
            </li>
            <li className="nav-items">
              <span className="nav-links" onClick={() => { setPage(0); navigate("/med-bot") }}>MEDBot</span>
            </li>
            {patient && <li className="nav-items">
              <Link className="nav-links" to="/user-profile">Profile</Link>
            </li>}
            {admin && <li className="nav-items">
              <Link className="nav-links" to="/admin-profile">Admin</Link>
            </li>}
            {!admin && !patient ? <li className="nav-items">
              <Link className="nav-links" to="/login">Login</Link>
            </li> : null}
            {admin || patient ? <li className="nav-items">
              <span className="nav-links" onClick={logout}>Logout</span>
            </li> : null}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
