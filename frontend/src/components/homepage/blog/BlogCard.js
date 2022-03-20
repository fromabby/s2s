import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {

    const { title, content, images, author, _id: id } = props.post

    const spliceContent = (content) => {
        return content.length > 100 ? content.substring(0, 97) + "..." : content
    }

    return (
        <div className="card-block" >
            <div id="featured_subpost1">
                <div className='featured_image'>
                    <img id="recent_img1" src={images[0].path} />
                </div>
                <div className='featured_content'>
                    <h1 id="recent_title1" >{title}</h1>
                    <p id="recent_date_author1"><span style={{ fontStyle: "italic" }}>By {author}</span> | March 20, 2021</p>
                    <p className='blog_content'>{spliceContent(content)}</p>
                </div>
                <div className='featured_button'>
                    <Link to={`/blog/${id}`}>
                        <a className="btn read-btn1" href="#" >Read More</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard