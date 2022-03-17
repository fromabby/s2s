import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const FeaturedBlogs = ({ featuredPost, subFeaturedPost }) => {

    const { title, content, images, author, createdAt, _id: id } = featuredPost
    return (
        <div>
            <div className="featured">
                <Link to={`/blog/${id}`} style={{ textDecoration: "none" }}>
                    <div className="featured_container_1">
                        <div id="home">
                            <img
                                id="featured_img"
                                src={images[0].path}
                                alt="featured pic"
                            />
                            <h1 id="featured_title" style={{ textAlign: "center" }}>
                                {title}
                            </h1>
                            <p
                                id="featured_date_author"
                                style={{ textAlign: "center" }}
                            >
                                By {author} | {formatDate(createdAt)}
                            </p>
                            <p id="featured_summary" style={{ textAlign: "center" }}>
                                {content}
                            </p>
                        </div>
                    </div>
                </Link>
                <div className="featured_container_2">
                    {
                        subFeaturedPost.map(post => (
                            <Link to={`/blog/${post._id}`} style={{ textDecoration: "none" }}>
                                <div id="featured_subpost">
                                    <img
                                        id="featured_sub_img"
                                        src={post.images[0].path}
                                        alt="sub_img"
                                    />
                                    <div id="featured_sub_text">
                                        <h1 id="subfeatured_title">
                                            {post.title}
                                        </h1>
                                        <p id="subfeatured_date_author">
                                            By {post.author} | {formatDate(post.date)}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeaturedBlogs