import React, { useEffect, useContext } from 'react'
import { useAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'


const SideNav = () => {

    const { auth, logout } = useContext(AuthContext)
    const { loading, user, loadError } = auth

    const location = useLocation()

    const alert = useAlert()

    useEffect(() => {
        if (loadError) {
            alert.error(loadError)
        }
    }, [user, loadError])


    const navigate = useNavigate()

    const logoutUser = async () => {

        await logout()
        navigate('/login')
    }

    return (
        <div className="sidenav">
            <Link to="/admin">
                <img id="sidenav-logo" src="/images/logo.png" />
            </Link>
            {user?.role === 'admin' &&
                <div className={location.pathname.includes('/admin/user') && 'nav-active'}>
                    <Link to="/admin/user" className="nav-link">
                        Manage Users
                    </Link>
                </div>
            }
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
                <Link to="/admin/password/update" className="nav-link">
                    Change Password
                </Link>
            </div>
            <div className="nav-link">
                <a onClick={logoutUser}>
                    Log Out
                </a>
            </div>
        </div>
    )
}

export default SideNav