import React, { useContext, useEffect, useState } from 'react'
import PostContext from '../../context/postContext'
import BlogCard from './blog/BlogCard'
import Metadata from '../layout/Metadata'
import './css/Blog.css'
import { Button, Dropdown, DropdownButton, Form } from 'react-bootstrap'

const PublicBlogList = ({ title }) => {

    const { posts: postData } = useContext(PostContext)
    const { isLoading, posts } = postData
    const [maxDisplay, setMaxDisplay] = useState(8)
    const [searchQuery, setSearchQuery] = useState('')
    const [categoryQuery, setCategoryQuery] = useState('')
    const [postList, setPostList] = useState(posts)
    const [categories, setCategories] = useState(["Environment", "Children’s rights", "Partnerships", "Health"])


    const changeMaxHandler = () => {
        if (maxDisplay === 8) {
            setMaxDisplay(posts.length)
        }
        else {
            setMaxDisplay(8)
        }
    }


    useEffect(() => {
        if (categoryQuery === "-") {
            let filteredPost = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
            setPostList(filteredPost)
        }
        else {
            let filteredPost = []
            if (searchQuery) {
                let newPostList = posts.filter(post => post.category.toLowerCase().includes(categoryQuery.toLowerCase()))
                filteredPost = newPostList.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
            }
            else {
                filteredPost = posts.filter(post => post.category.toLowerCase().includes(categoryQuery.toLowerCase()))
            }
            setPostList(filteredPost)
        }
    }, [searchQuery, categoryQuery, posts])

    return (
        <>
            <Metadata title={title} />
            {
                isLoading ? <>Loading</> :
                    <div id="blog">
                        <div className='filter-container'>
                            <Form.Control type="text" style={{ width: '500px' }} onChange={(e) => setSearchQuery(e.target.value)} />
                            < Form.Select style={{ width: '200px' }} name="category" value={categoryQuery} onChange={(e) => setCategoryQuery(e.target.value)} >
                                <option value="">Select Category</option>
                                <option value="Environment">Environment</option>
                                <option value="Children’s rights">Children’s rights</option>
                                <option value="Partnerships">Partnerships</option>
                                <option value="Health">Health</option>
                            </Form.Select >
                            <Button style={{ marginLeft: "10px" }} onClick={() => {
                                setSearchQuery('')
                                setCategoryQuery('')
                            }}>Clear Filter</Button>
                        </div>

                        <div className="recent1">
                            {
                                postList && postList.map((post, index) => (
                                    index < maxDisplay && !post.isArchived
                                        ? <BlogCard post={post} />
                                        : ''
                                ))
                            }
                        </div>
                        {
                            postList.length > 8 &&
                            <Button onClick={changeMaxHandler}>
                                {
                                    maxDisplay === 8 ? 'See More' : 'See Less'
                                }
                            </Button>
                        }

                    </div>
            }
        </>

    )
}

export default PublicBlogList