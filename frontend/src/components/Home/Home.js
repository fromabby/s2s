import React from 'react'
import FeaturedBlogs from './FeaturedBlogs'
import './Home.css'
import RecentBlogs from './RecentBlogs'
import Banners from './Banners'
import Metadata from '../Layout/Metadata'

const Home = () => {
    return (
        <div>
            <Metadata title={`Home`} />
            <div className="container-home container">
                <Banners />
                <FeaturedBlogs />
                <RecentBlogs />
            </div>
        </div>
    )
}

export default Home