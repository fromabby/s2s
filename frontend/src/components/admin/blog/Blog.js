import axios from 'axios'
import React from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const Blog = (props) => {

    const { title, images, _id: id, isFeature, isSubFeature, isArchived } = props.post
    const { archivePost, deletePost, updateItem, count, subCount } = props


    const alert = useAlert()

    const updateFeature = () => {
        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, { ...props.post, isFeature: !isFeature, isSubFeature: false }, multiformdata)
                if (data.success) {
                    updateItem(props.post, data.post)
                    if (isFeature) {
                        alert.success("Removed featured post")
                    } else {
                        alert.success("Post Featured")
                    }
                }
            }

            if (isFeature) {
                updatePost()
            } else {
                if (count < 1) {
                    updatePost()
                }
                else {
                    alert.error("Only one featured post allowed!")
                }
            }

        }
        catch (error) {
            alert.error("Error")
        }
    }

    const updateSubFeature = () => {

        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, { ...props.post, isSubFeature: !isSubFeature }, multiformdata)
                if (data.success) {
                    updateItem(props.post, data.post)
                    if (isSubFeature) {
                        alert.success("Removed subfeatured post")
                    } else {
                        alert.success("Post added to Subfeatures")
                    }
                }
            }

            if (isSubFeature) {
                updatePost()
            } else {
                if (subCount < 3) {
                    updatePost()
                }
                else {
                    alert.error("Only three featured post allowed!")
                }
            }

        }
        catch (error) {
            alert.error("Error")
            console.log(error)
        }
    }
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
                    {
                        !isArchived &&
                        <>
                            <Form.Check
                                checked={isFeature}
                                type="switch"
                                disabled={isSubFeature}
                                label="Feature"
                                id="disabled-custom-switch"
                                onChange={(updateFeature)}
                            />
                            <Form.Check
                                checked={isSubFeature}
                                type="switch"
                                disabled={isFeature}
                                label="Subfeature"
                                id="disabled-custom-switch"
                                onChange={(updateSubFeature)}
                            />
                        </>
                    }
                </div>
            </td>
        </tr>
    )
}

export default Blog