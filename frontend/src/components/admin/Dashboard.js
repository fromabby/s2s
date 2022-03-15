import React from 'react'
import SideNav from './SideNav'

const Dashboard = ({ children }) => {
    return (
        <div className='d-flex flex-row' style={{background: "none"}}>
            <SideNav />
            <main className='main-dashboard'>
                {children}
            </main>
        </div>
    )
}

export default Dashboard