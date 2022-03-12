import React from 'react'
import FeaturedBlogs from './FeaturedBlogs'
import './Home.css'
import RecentBlogs from './RecentBlogs'

const Home = () => {

  return (
    <div>
      <div className="container-home container">
        <FeaturedBlogs />
        <RecentBlogs />
      </div>
    </div>
  )
}

export default Home