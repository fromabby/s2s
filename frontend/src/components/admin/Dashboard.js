import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'
import SideNav from './SideNav'

const Dashboard = ({ children }) => {

    const { auth } = useContext(AuthContext)
    const { isAuthenticated, loading } = auth


    if (loading === false) {
        if (!isAuthenticated) return <Navigate to="/login" />
    }

    return (
        <div className='d-flex flex-row dashboardBG'>
            <SideNav />
            <main className='main-dashboard'>
                {children}
            </main>
        </div>
    )
}

export default Dashboard