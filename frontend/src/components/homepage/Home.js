import React, { useContext } from 'react'
import './css/Home.css'
import FeaturedBlogs from './home/FeaturedBlogs'
import RecentBlogs from './home/RecentBlogs'
import Banners from './home/Banners'
import Metadata from '../layout/Metadata'
import PostContext from '../../context/postContext'

const Home = () => {

    const { posts } = useContext(PostContext)

    console.log(posts)
    const { posts: postList, isLoading } = posts

    const featuredPost = postList.filter(post => post.isFeature === true)[0] || postList[0]
    const subFeaturedPost = postList.filter(post => post.isSubFeature === true) || postList
    return (
        (!isLoading && postList.length > 0) &&
        <div>
            <Metadata title={`Home`} />
            <Banners />
            <div className="container-home container">
                <FeaturedBlogs featuredPost={featuredPost} subFeaturedPost={subFeaturedPost}/>
                <RecentBlogs recentPosts={postList} />
            </div>
        </div>
    )
}

export default Home