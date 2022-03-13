import React, { useContext } from 'react'
import FeaturedBlogs from './FeaturedBlogs'
import './Home.css'
import RecentBlogs from './RecentBlogs'
import Banners from './Banners'
import Metadata from '../Layout/Metadata'
import PostContext from '../../context/postContext'

const Home = () => {

    const {posts} = useContext(PostContext)

    const { posts:recentPosts, isLoading} = posts

    console.log(recentPosts)

    return (
        <div>
            <Metadata title={`Home`} />
            <div className="container-home container">
                <Banners />
                <FeaturedBlogs />
                <RecentBlogs recentPosts={recentPosts}/>
            </div>
        </div>
    )
}

export default Home