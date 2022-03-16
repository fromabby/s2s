import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../../context/authContext'

function AdminRoutes() {
    // const { isAuthenticated, loading, user } = useSelector(state => state.auth)
    const { auth } = useContext(AuthContext)
    const { isAuthenticated, loading } = auth


    if (loading === false) {
        if (!isAuthenticated) return <Navigate to="/login" />
    }

    return <Outlet />;
}


export default AdminRoutes