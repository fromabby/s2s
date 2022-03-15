import { useContext } from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { useAlert } from 'react-alert'
import './css/Header.css'


const Header = () => {
    const { auth, logout } = useContext(AuthContext)
    const alert = useAlert()

    const logoutHandler = () => {
        logout()
        alert.success("Logged out successfully")
    }

    return (
        <Nav className="navbar navbar-custom navbar-light navbar-expand-lg">
            <Link className="navbar-brand" to="/"><img
                src="/images/logo.png"
                width="100"
                height="80"
                alt="STS Logo"
            /></Link>
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
                        auth.isAuthenticated &&
                        <li>
                            <button onClick={logoutHandler}>Logout</button>
                        </li>
                    }
                </ul>
            </div>
        </Nav>
    );
}
export default Header;

