import React from 'react'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const BlogCard = (props) => {

    console.log(props)
    const { title, content, images, author, _id: id, createdAt } = props.post

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
                    <p id="recent_date_author1">
                        By {author} | {formatDate(createdAt)}
                    </p>
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