import React from 'react'
import Blog from './Blog'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const RecentBlogs = ({ recentPosts }) => {



    return (
        <div className='recent-wrapper'>
            <h1 className="text-left" style={{ fontSize: 38.4 }}>
                RECENT POSTS
            </h1>
            <div className="recent">
                {
                    recentPosts.map((post, index) => (
                        index < 4 && !post.isArchived &&
                        <Blog post={post} />
                    ))
                }
            </div>
            <div className='d-flex justify-content-center mt-5'>
                <Link to="/blog">
                    <Button>See More</Button>
                </Link>
            </div>
        </div>
    )
}

export default RecentBlogs