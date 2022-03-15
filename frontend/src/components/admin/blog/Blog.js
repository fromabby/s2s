import React from 'react'
import { useAlert } from 'react-alert'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const Blog = (props) => {

    const { title, content, images, author, _id: id, createdAt, isArchived } = props.post
    const { archivePost, deletePost } = props

    const alert = useAlert()

    const archiveItem = () => {
        archivePost(props.post)
        alert.success(isArchived ? 'Post restored' : 'Moved to Archives')
    }

    const deleteItem = () => {
        deletePost(id)
        alert.success('Post Deleted')
    }

    return (
        <tr>
            <td>
                <div className='td-container'>
                    {props.index}
                </div>
            </td>
            <td>
                <div className='td-container'>
                    <div className='image-wrapper'>
                        <img className='image' src={images[0].path} />
                    </div>
                </div>
            </td>
            <td>
                <div className='td-container'>
                    {title}
                </div>
            </td>
            <td>
                <div className='td-container'>
                    {
                        !isArchived && <Link to={`/admin/blog/edit/${id}`}>
                            <Button>Edit</Button>
                        </Link>
                    }

                    <Button className={`btn ${isArchived ? 'btn-success' : 'btn-danger'}`} onClick={archiveItem}>
                        {isArchived ? 'Restore' : 'Archive'}
                    </Button>
                    {
                        isArchived &&
                        <Button className="btn btn-danger" onClick={deleteItem}>
                            Delete
                        </Button>
                    }
                </div>
            </td>
        </tr>
    )
}

export default Blog