import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import AuthContext, { AuthContextProvider } from '../../context/authContext'

function SuperadminRoutes() {
    // const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const { auth } = useContext(AuthContext)
    const { isAuthenticated, loading, user } = auth


    if (loading === false) {
        if (!isAuthenticated) return <Navigate to="/login" />
        if (user.role === 'admin') return <Navigate to='/' />
    }

    return <Outlet />;
}


export default SuperadminRoutes