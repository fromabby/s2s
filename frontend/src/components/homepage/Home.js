import React, { useContext } from 'react'
import './css/Home.css'
import FeaturedBlogs from './home/FeaturedBlogs'
import RecentBlogs from './home/RecentBlogs'
import Banners from './home/Banners'
import Metadata from '../layout/Metadata'
import PostContext from '../../context/postContext'
import Load from '../layout/Load'

const Home = ({ title }) => {

    const { posts } = useContext(PostContext)

    const { posts: postList, isLoading } = posts

    const featuredPost = postList.filter(post => post.isFeature === true)[0] || postList[0]
    const subFeaturedPost = postList.filter(post => post.isSubFeature === true) || postList


    const recent = postList.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt);
    });


    return (
        isLoading ? <Load /> :
            (postList.length > 0) &&
            <div>
                <Metadata title={title} />
                <Banners />
                <FeaturedBlogs featuredPost={featuredPost} subFeaturedPost={subFeaturedPost} />
                <RecentBlogs recentPosts={recent} />
            </div>
    )
}

export default Home