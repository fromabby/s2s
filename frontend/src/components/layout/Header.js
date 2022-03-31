import { Nav, NavDropdown, NavItem } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./css/Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <Nav className="navbar navbar-custom navbar-light navbar-expand-lg">
      <Link className="navbar-brand" to="/">
        <img src="/images/logo.png" width="100" height="80" alt="STS Logo" />
      </Link>
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
      <div className="collapse navbar-collapse " id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto d-flex align-items-center">
          <Nav.Item>
            <Link
              className={location.pathname === "/" ? "item-active" : "nav-link"}
              to="/"
            >
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={
                location.pathname.includes("/blog") ? "item-active" : "nav-link"
              }
              to="blog"
            >
              Blog
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link
              className={
                location.pathname.includes("/partners")
                  ? "item-active"
                  : "nav-link"
              }
              to="partners"
            >
              Partner & Volunteer
            </Link>
          </Nav.Item>

          <NavDropdown
            title="About"
            as={NavItem}
            id="nav-dropdown"
            className="nav-dropdown"
          >
            <NavDropdown.Item>
              <Link
                className="nav-link"
                // className={
                //   location.pathname.includes("/about-us")
                //     ? "item-active"
                //     : "nav-link"
                // }
                to="about-us"
              >
                About Us
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <Link
                className="nav-link"
                // className={
                //   location.pathname.includes("/contact-us")
                //     ? "item-active"
                //     : "nav-link"
                // }
                to="contact-us"
              >
                Contact Us
              </Link>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Link className="nav-link" to="donate">
              <a className="btn nav-link donate-btn">Donate</a>
            </Link>
          </Nav.Item>
        </ul>
      </div>
    </Nav>
  );
};
export default Header;
