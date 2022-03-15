import React, { useContext, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import AuthContext from '../../context/authContext'

const MyProfile = () => {
    const alert = useAlert()

    const { auth } = useContext(AuthContext)
    const { loading, user, loadError } = auth


    useEffect(() => {
        if (loadError) {
            alert.error(loadError)
        }
    }, [user, loadError])

    return (
        <div>
            {loading ? <p>Loading...</p> :
                <>
                    <h4>My Profile</h4>
                    <p>Email: {user.email}</p>
                    <p>Name: {user.name}</p>
                    <p>Role: {user.role}</p>
                    <Link to='/me/update'>Update Profile</Link>
                    <Link to='/password/update'>Update Password</Link>
                </>
            }
        </div>
    )
}

export default MyProfile
