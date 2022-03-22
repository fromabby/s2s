import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const FeaturedBlogs = ({ featuredPost, subFeaturedPost }) => {

    const spliceContent = (content) => {
        return content.length > 100 ? content.substring(0, 152) + "..." : content
    }


    const { title, content, images, author, createdAt, _id: id } = featuredPost
    return (
        <div className="featured my-5">
            <div className="featured_container_1">
                <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
                    <div id="home">
                        <img
                            id="featured_img"
                            src={images[0].path}
                            alt="featured pic"
                        />
                        <h1 id="featured_title" style={{ textAlign: "justify" }}>
                            {title}
                        </h1>
                        <p
                            id="recent_date_author1"
                            style={{ textAlign: "justify" }}
                        >
                            By {author} | {formatDate(createdAt)}
                        </p>
                        <p id="featured_summary" style={{ textAlign: "justify" }}>
                            {spliceContent(content)}
                        </p>
                    </div>
                </Link>
            </div>
            <div className="featured_container_2">
                {
                    subFeaturedPost.map(post => (
                        <Link to={`/blog/${post._id}`} style={{ textDecoration: "none" }} id="featured_subpost">

                            <div id="featured_sub_text">
                                <h1 id="subfeatured_title">
                                    {post.title}
                                </h1>
                                <p id="recent_date_author1">
                                    By {post.author} | {formatDate(post.date)}
                                </p>
                            </div>
                            <img
                                id="featured_sub_img"
                                src={post.images[0].path}
                                alt="sub_img"
                            />
                        </Link>

                    ))
                }
            </div>
        </div>
    )
}

export default FeaturedBlogs


