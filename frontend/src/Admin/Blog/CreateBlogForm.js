import axios from 'axios';
import React, { Fragment, useState } from 'react'
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';

const CreateBlogForm = () => {

    const [post, setPost] = useState({})
    const [images, setImages] = useState([])

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const alert = useAlert()

    const submitHandler = (e) => {
        e.preventDefault();

        var formData = new FormData()
        Object.keys(post).forEach(key => {
            formData.set(key, post[key])
        });

        images.map(image => formData.append('images', image))

        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            const { data } = axios.post('/api/v1/posts', formData, multiformdata)
            if (data.sucess) {
                alert.success("Post created")
            }
        }
        catch (error) {
            alert.error("Error")
        }
    }

    return (
        <Fragment>
            <Form className="container mt-2" onSubmit={submitHandler}>

                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" placeholder="Enter Title" value={post.title} onChange={changeHandler} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea" name="content" value={post.content} onChange={changeHandler} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Select Images</Form.Label>
                    <Form.Control type="file" multiple onChange={(e) => setImages(Array.from(e.target.files))} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Fragment>
    )
}

export default CreateBlogForm