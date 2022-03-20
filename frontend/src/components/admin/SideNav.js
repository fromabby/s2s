import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const SideNav = () => {
    const location = useLocation()
    return (
        <div className="sidenav">
            <Link to="/admin/dashboard/">
                <img id="sidenav-logo" src="/images/logo.png" />
            </Link>
            <div className={location.pathname.includes('/admin/banner') && 'nav-active'}>
                <Link to="/admin/banner" className="nav-link">
                    Manage Banner
                </Link>
            </div>
            <div className={location.pathname === '/admin/blog' && 'nav-active'}>
                <Link to="/admin/blog" className="nav-link">
                    Manage Post
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/blog/archive') && 'nav-active'}>
                <Link to="/admin/blog/archive" className="nav-link">
                    Manage Archives
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/comment') && 'nav-active'}>
                <Link to="/admin/comment" className="nav-link">
                    Manage Comments
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/about') && 'nav-active'}>

                <Link to="/admin/about" className="nav-link">
                    Manage About Us
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/registration') && 'nav-active'}>

                <Link
                    exact
                    to="/admin/registration"
                    className="nav-link"
                >
                    Manage Registration
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/donation') && 'nav-active'}>

                <Link to="/admin/donation" className="nav-link">
                    Manage Donation
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/record') && 'nav-active'}>

                <Link to="/admin/record" className="nav-link">
                    Manage Records
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/update') && 'nav-active'}>

                <Link to="/password/update" className="nav-link">
                    Change Password
                </Link>
            </div>
            <div className={location.pathname.includes('/admin/dashboard/manage-logout') && 'nav-active'}>

                <Link exact to="/admin/dashboard/manage-logout" className="nav-link">
                    Log Out
                </Link>
            </div>
        </div>
    )
}

export default SideNav