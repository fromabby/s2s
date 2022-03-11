import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Header = () => {

  const { isLoggedIn, onLogout } = useContext(AuthContext)
  return (
    <Nav className="navbar navbar-custom navbar-light navbar-expand-lg">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse "
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              <a className="nav-link">Home</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="blog" >
              <a className="nav-link">Blog</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="partners"
            >
              <a className="nav-link">Partner & Volunteer</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="about-us">
              <a className="nav-link">About Us</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link"
              to="contact-us"
            >
              <a className="nav-link">Contact Us</a>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="donate">
              <a className="btn nav-link donate-btn">Donate</a>
            </Link>
          </li>
          {
            isLoggedIn &&
            <li>
              <button onClick={() => onLogout()}>Logout</button>
            </li>
          }
        </ul>
      </div>
    </Nav>
  );
}
export default Header;

