import axios from 'axios';
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import PostContext from '../../context/postContext';

const UpdateBlogForm = () => {

    const [post, setPost] = useState({})
    const [images, setImages] = useState([])

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const { id } = useParams()

    const { posts, fetchSingleData } = useContext(PostContext)
    const { post: postDetail, isLoading } = posts

    useEffect(() => {
        fetchSingleData(id)
    }, [])

    useEffect(() => {
        setPost(postDetail)
        setImages(postDetail.images)
    }, [postDetail])

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
            const multiformdata = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, formData, multiformdata)
                console.log(data)
                if (data.success) {
                    alert.success("Post Updated")
                    navigate(`/blog/${data.post._id}`)
                }
            }
            updatePost()
        }
        catch (error) {
            alert.error("Error")
            console.log(error)
        }
    }

    return (
        !isLoading && post ?
            <Fragment>
                <Form className="container mt-2" onSubmit={submitHandler}>

                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Enter Title" value={post.title} onChange={changeHandler} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" name="author" placeholder="Enter Author" value={post.author} onChange={changeHandler} />
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
            : <>Loading</>
    )
}

export default UpdateBlogForm