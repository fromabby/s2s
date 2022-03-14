import React from 'react'
import formatDate from '../../../formatDate'


const Blog = ({post}) => {

    

    return (
        <div className="recent_card">
            <img id="recent_img" src="/images/featured_sub_image.png" />
            <div id="recent_text">
                <h1 id="recent_title">
                    {post.title}
                </h1>
                <p id="recent_date_author">
                    By {post.author} | {formatDate(post.createdAt)}
                </p>
                <p id="recent_summary">
                    {post.content}
                </p>
                <a className="btn read-btn" href={`/blog/${post._id}`}>
                    Read More
                </a>
            </div>
        </div>
    )
}

export default Blog