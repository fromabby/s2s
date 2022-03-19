import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/authContext'

const SideNav = () => {

    const { auth } = useContext(AuthContext)
    const { loading, user, loadError } = auth


    useEffect(() => {
        if (loadError) {
            alert.error(loadError)
        }
    }, [user, loadError])
    return (
        <div className="sidenav">
            <Link to="/admin/dashboard/">
                <img id="sidenav-logo" src="/images/logo.png" />
            </Link>
            <Link to="/admin/banner" className="nav-link">
                Manage Banner
            </Link>
            <Link to="/admin/blog" className="nav-link">
                Manage Post
            </Link>
            <Link to="/admin/blog/archive" className="nav-link">
                Manage Archives
            </Link>
            <Link to="/admin/comment" className="nav-link">
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


            <Link to="/admin/me" className="nav-link">
                My Profile
            </Link>


            {user && user.role === 'superadmin' &&
                <Link to="/admin/user" className="nav-link">
                    Manage users
                </Link>
            }


            <Link to="/admin/password/update" className="nav-link">
                Change Password
            </Link>
            <Link exact to="/admin/dashboard/manage-logout" className="nav-link">
                Log Out
            </Link>
        </div>
    )
}

export default SideNav