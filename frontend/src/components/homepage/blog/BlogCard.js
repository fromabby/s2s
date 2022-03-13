import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {

    const { title, content, images, author, _id: id } = props.post

    return (
        <div className="card-block px-2" >
            <div id="featured_subpost1">
                <img id="recent_img1" src={images[0].path} />
                <h1 id="recent_title1" >{title}</h1>
                <p id="recent_date_author1">By {author} | March 20, 2021</p>
                <p id="recent_summary1">{content}</p>
                <Link to={`/blog/${id}`}>
                    <a className="btn read-btn1" href="#" >Read More</a>
                </Link>
            </div>
        </div>
    )
}

export default BlogCard