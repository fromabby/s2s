import React, { Fragment, useContext, useState } from 'react'
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PostContext from '../../../context/postContext'
import Metadata from '../../layout/Metadata'

const CreateBlogForm = ({ title }) => {
    const [post, setPost] = useState({})
    const [images, setImages] = useState([])

    const { addData } = useContext(PostContext)

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const alert = useAlert()
    const navigate = useNavigate()

    const submitHandler = (e) => {
        e.preventDefault();

        var formData = new FormData()
        Object.keys(post).forEach(key => {
            formData.set(key, post[key])
        });

        images.map(image => formData.append('images', image))

        try {
            addData(formData)
            alert.success("Post created")
            navigate('/admin/blog')
        }
        catch (error) {
            alert.error("Error")
            console.log(error)
        }
    }

    console.log(images)

    return (
        <Fragment>
            <Metadata title={title} />
            <Form className="container mt-2" onSubmit={submitHandler}>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter Title" value={post.title} onChange={changeHandler} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" name="author" placeholder="Enter Author" value={post.author} onChange={changeHandler} />
                </Form.Group>

                {images &&
                    <div>
                        {
                            images.map(image => <>{image?.name}</>)
                        }
                    </div>
                }


                <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control type="text" name="category" placeholder="Enter Category" value={post.category} onChange={changeHandler} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" name="content" placeholder="Enter content" value={post.content} onChange={changeHandler} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Images</Form.Label>
                    <Form.Control type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                </Form.Group>
                <div className='d-flex flex-row justify-content-end'>
                    <Button variant="success" type="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </Fragment>
    )
}

export default CreateBlogForm