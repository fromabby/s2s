import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import { useAlert } from 'react-alert'
import Blog from './Blog'
import './Blog.css'

const BlogList = () => {

    const { posts: data, updateData: updateItem, archiveData: archivePost, deleteData: deletePost } = useContext(PostContext)
    const { posts: postList, isLoading } = data


    const [posts, setPosts] = useState(postList)

    useEffect(() => {
        setPosts(postList)
    }, [postList])

    const filteredPost = posts.filter(post => post.isArchived === false)
    let featureCount = posts.filter(post => post.isFeature === true).length
    let subfeatureCount = posts.filter(post => post.isSubFeature === true).length


    const alert = useAlert()

    const updateFeature = (post) => {
        const { title, images, _id: id, isFeature, isSubFeature, isArchived } = post

        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, { ...post, isFeature: !isFeature, isSubFeature: false }, multiformdata)
                if (data.success) {
                    updateItem(post, data.post)
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
                if (featureCount < 1) {
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

    const updateSubFeature = (post) => {
        const { title, images, _id: id, isFeature, isSubFeature, isArchived } = post
        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, { ...post, isSubFeature: !isSubFeature }, multiformdata)
                if (data.success) {
                    updateItem(post, data.post)
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
                if (subfeatureCount < 3) {
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
    const archiveItem = (post) => {
        const { isArchived } = post
        archivePost(post)
        alert.success(isArchived ? 'Post restored' : 'Moved to Archives')
    }


    const deleteItem = (id) => {
        deletePost(id)
        alert.success('Post Deleted')
    }

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 200,
                },
                {
                    label: 'IMAGE',
                    field: 'image',
                    width: 200,
                },
                {
                    label: 'TITLE',
                    field: 'title',
                    width: 200,
                },
                {
                    label: 'ACTIONS',
                    field: 'actions',
                    width: 200,
                }
            ],
            rows: []
        }

        filteredPost && filteredPost.forEach((post, index) => {
            const { title, images, _id: id, isFeature, isSubFeature, isArchived } = post
            data.rows.push({
                id: <div className='td-container'>
                    {index + 1}
                </div>,
                image: <div className='td-container'>
                    <div className='image-wrapper'>
                        <img className='image' src={images[0].path} />
                    </div>
                </div>,
                title: <div className='td-container'>
                    {title}
                </div>,
                actions: <div className='td-container'>
                    {
                        !isArchived && <Link to={`/admin/blog/edit/${id}`}>
                            <Button>Edit</Button>
                        </Link>
                    }

                    <Button className={`btn ${isArchived ? 'btn-success' : 'btn-danger'}`} onClick={() => archiveItem(post)}>
                        {isArchived ? 'Restore' : 'Archive'}
                    </Button>
                    {
                        isArchived &&
                        <Button className="btn btn-danger" onClick={() => deleteItem(id)}>
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
                                onChange={() => updateFeature(post)}
                            />
                            <Form.Check
                                checked={isSubFeature}
                                type="switch"
                                disabled={isFeature}
                                label="Subfeature"
                                id="disabled-custom-switch"
                                onChange={() => updateSubFeature(post)}
                            />
                        </>
                    }
                </div>
            })
        })

        return data
    }



    return (
        isLoading ? <>Loading</>
            :
            <div className='manage-post-div'>
                <div className='create-button'>
                    <Link to="/admin/blog/new">
                        <Button className='btn-success'>New Post</Button>
                    </Link>
                </div>
                <Form.Control type='text' onChange={(e) => setPosts(postList.filter(post => post.title.includes(e.target.value)))} />
                <MDBDataTableV5
                    hover
                    entriesOptions={[5, 20, 25]}
                    entries={5}
                    pagesAmount={4}
                    data={setData()}
                    fullPagination
                    searching={false}
                    searchTop
                    searchBottom={false}
                />
            </div>
    )
}

export default BlogList