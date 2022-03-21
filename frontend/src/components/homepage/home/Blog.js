import React from 'react'
import formatDate from '../../../formatDate'


const Blog = ({ post }) => {

    const spliceContent = (content) => {
        return content.length > 100 ? content.substring(0, 300) + "..." : content
    }

    return (
        <div className="recent_card">
            <img id="recent_img" src={post.images[0].path} />
            <div id="recent_text">
                <h1 id="recent_title">
                    {post.title}
                </h1>
                <p id="recent_date_author1">
                    By {post.author} | {formatDate(post.createdAt)}
                </p>
                <p id="recent_summary">
                    {spliceContent(post.content)}
                </p>
                <a className="btn read-btn" href={`/blog/${post._id}`}>
                    Read More
                </a>
            </div>
        </div>
    )
}

export default Blog