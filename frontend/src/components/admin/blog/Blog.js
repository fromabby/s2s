import React from 'react'
import { useAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Blog = (props) => {

    const { title, content, images, author, _id: id } = props.post
    const { deletePost } = props

    const alert = useAlert()

    const deleteItem = () => {
        deletePost(id)
        alert.success("Post Deleted")
    }

    return (
        <div className="card-block px-2" >
            <div id="featured_subpost1">
                <img id="recent_img1" src={images[0].path} />
                <h1 id="recent_title1" >{title}</h1>
                <p id="recent_date_author1">By {author} | March 20, 2021</p>
                <p id="recent_summary1">{content}</p>
                <Link to={`/blog/${id}`}>
                    <Button>View</Button>
                </Link>
                <Link to={`/admin/blog/edit/${id}`}>
                    <Button>Edit</Button>
                </Link>
                <Button className='btn btn-danger' onClick={deleteItem}>Delete</Button>

            </div>
        </div>
    )
}

export default Blog