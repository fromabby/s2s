import { Link } from "react-router-dom";
import "./css/Footer.css";

const Footer = () => {
    return (
        <>
            <footer className="footer footer--pin">
                <div className="row d-flex justify-content-center align-items-center text-center">
                    <div className="col-md">
                        <img
                            src="/images/Footer_Logo.png"
                            style={{ width: "100%" }}
                            className="responsive"
                        />
                    </div>

                    <div className="d-flex flex-column col-md" id="footer">
                        <h1>STREETS TO SCHOOLS</h1>
                        <div className="box d-flex flex-row justify-content-center">
                            <a href="mailto:streetstoschools.org@gmail.com" target="_blank">
                                <img src="/images/Footer_Gmail.png" className="img-fluid mx-1 rounded" />
                            </a>
                            <a
                                href="https://www.facebook.com/StreetstoSchoolsProject/"
                                target="_blank"
                            >
                                <img src="/images/Footer_Facebook.png" className="img-fluid mx-1 rounded" />
                            </a>
                            <a
                                href="https://www.instagram.com/streetstoschools.project/"
                                target="_blank"
                            >
                                <img
                                    src="/images/Footer_Instagram.png"
                                    className="img-fluid mx-1 rounded"
                                />
                            </a>
                        </div>
                    </div>

                    <ul className="r-footer col-md">
                        <li id="footer1">
                            <h2>SUPPORT</h2>
                            <ul className="box">
                                <li>
                                    <Link to={"/donate"}>Donate Now</Link>
                                </li>
                                <li>
                                    <Link to={"/partners"}>Partner</Link>
                                </li>
                                <li>
                                    <Link to={"/partners"}>Volunteer</Link>
                                </li>
                            </ul>
                        </li>
                        <li id="footer1">
                            <h2>CONNECT</h2>
                            <ul className="box">
                                <li>
                                    <Link to={"/about-us"}>About Us</Link>
                                </li>
                                <li>
                                    <Link to={"/contact-us"}>Contact Us</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>FAQ</Link>
                                </li>
                            </ul>
                        </li>
                        <li id="footer1">
                            <h2>DISCOVER</h2>
                            <ul className="box">
                                <li>
                                    <Link to={"/"}>Latest Stories</Link>
                                </li>
                                <li>
                                    <Link to={"/"}>Upcoming Events</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="b-footer">
                    <p>©2022 Streets to Schools. All rights reserved.</p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
