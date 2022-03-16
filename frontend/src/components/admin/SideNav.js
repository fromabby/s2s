import React from 'react'
import { Link } from 'react-router-dom'

const SideNav = () => {
    return (
        <div className="sidenav">
            <Link to="/admin/dashboard/">
                <img id="sidenav-logo" src="/images/logo.png" />
            </Link>
            <Link to="/admin/banner" className="nav-link">
                Manage Banner
            </Link>
            <Link to="/admin/blog/featured" className="nav-link">
                Manage Featured
            </Link>
            <Link to="/admin/blog" className="nav-link">
                Manage Post
            </Link>
            <Link to="/admin/blog/archive" className="nav-link">
                Manage Archives
            </Link>
            <Link to="/admin/dashboard/manage-comments" className="nav-link">
                Manage Comments
            </Link>
            <Link to="/admin/about" className="nav-link">
                Manage About Us
            </Link>
            <Link
                exact
                to="/admin/registration"
                className="nav-link"
            >
                Manage Registration
            </Link>
            <Link to="/admin/donation" className="nav-link">
                Manage Donation
            </Link>
            <Link to="/admin/record" className="nav-link">
                Manage Records
            </Link>
            <Link to="/password/update" className="nav-link">
                Change Password
            </Link>
            <Link exact to="/admin/dashboard/manage-logout" className="nav-link">
                Log Out
            </Link>
        </div>
    )
}

export default SideNav