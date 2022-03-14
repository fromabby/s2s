import React, { useContext } from 'react'
import './css/Home.css'
import FeaturedBlogs from './home/FeaturedBlogs'
import RecentBlogs from './home/RecentBlogs'
import Banners from './home/Banners'
import Metadata from '../layout/Metadata'
import PostContext from '../../context/postContext'

const Home = () => {

    const { posts } = useContext(PostContext)

    const { posts: recentPosts, isLoading } = posts

    console.log(recentPosts)

    return (
        <div>
            <Metadata title={`Home`} />
            <Banners />
            <div className="container-home container">
                <FeaturedBlogs />
                <RecentBlogs recentPosts={recentPosts} />
            </div>
        </div>
    )
}

export default Home