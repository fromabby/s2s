import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../context/authContext'

function AdminRoutes() {
    const { auth, loadUser } = useContext(AuthContext)
    const { isAuthenticated, loading, user } = auth

    if (loading === false) {
        if (!isAuthenticated) return <Navigate to="/login" />
        if (user.role === 'contributor') return <Navigate to='/' />
    }

    return <Outlet />;
}


export default AdminRoutes