import React from 'react'
import FeaturedBlogs from './FeaturedBlogs'
import './Home.css'
import RecentBlogs from './RecentBlogs'
import Banners from './Banners'

const Home = () => {
    return (
        <div>
            <div className="container-home container">
                <Banners />
                <FeaturedBlogs />
                <RecentBlogs />
            </div>
        </div>
    )
}

export default Home