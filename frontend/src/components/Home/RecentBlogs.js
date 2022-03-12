import React from 'react'
import Blog from './Blog'

const RecentBlogs = () => {
    return (
        <div>
            <h1 className="text-left" style={{ fontSize: 38.4 }}>
                RECENT POSTS
            </h1>
            <div className="recent">
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
                <Blog />
            </div>
        </div>
    )
}

export default RecentBlogs