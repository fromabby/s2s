import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Table, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import { useAlert } from 'react-alert'
import Blog from './Blog'
import './Blog.css'

const ArchiveBlogList = () => {

    const { posts: data, updateData: updateItem, archiveData: archivePost, deleteData: deletePost } = useContext(PostContext)
    const { posts: postList, isLoading } = data

    const [posts, setPosts] = useState(postList)

    useEffect(() => {
        setPosts(postList)
    }, [postList])
    const filteredPost = posts.filter(post => post.isArchived === true)

    const alert = useAlert()





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
                    <Button className={`btn ${post.isArchived ? 'btn-success' : 'btn-danger'}`} onClick={() => archiveItem(post)}>
                        {post.isArchived ? 'Restore' : 'Archive'}
                    </Button>
                    {
                        post.isArchived &&
                        <Button className="btn btn-danger" onClick={() => deleteItem(post._id)}>
                            Delete
                        </Button>
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

export default ArchiveBlogList