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
    const [categories, setCategories] = useState([])

    const changeMaxHandler = () => {
        if (maxDisplay === 8) {
            setMaxDisplay(posts.length)
        }
        else {
            setMaxDisplay(8)
        }
    }

    const getAllCategories = () => {
        let categories = []
        posts.forEach(post => {
            let { category } = post
            if (!categories.includes(category) && !post.isArchived) {
                categories.push(category)
            }
        })
        return categories
    }


    useEffect(() => {
        let filteredPost = posts.filter(post => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        setPostList(filteredPost)
    }, [searchQuery, posts])

    useEffect(() => {
        if (categoryQuery === "-") {
            setPostList(posts)
        }
        else {
            let filteredPost = posts.filter(post => post.category.toLowerCase().includes(categoryQuery.toLowerCase()))
            setPostList(filteredPost)
        }
    }, [categoryQuery, posts])

    useEffect(() => {
        setCategories(getAllCategories())
    }, [posts])

    return (
        <>
            <Metadata title={title} />
            {
                isLoading ? <>Loading</> :
                    <div id="blog">
                        <Form.Control type="text" onChange={(e) => setSearchQuery(e.target.value)} />
                        <select className="form-select" onChange={(e) => setCategoryQuery(e.target.value)}>
                            <option selected>-</option>
                            {
                                categories.map(category => (
                                    <option value={category}>{category}</option>
                                ))
                            }
                        </select>
                        <div className="recent1">
                            {
                                postList && postList.map((post, index) => (
                                    index < maxDisplay && !post.isArchived
                                        ? <BlogCard post={post} />
                                        : ''
                                ))
                            }
                        </div>
                        <Button onClick={changeMaxHandler}>
                            {
                                maxDisplay === 8 ? 'See More' : 'See Less'
                            }
                        </Button>
                    </div>
            }
        </>

    )
}

export default PublicBlogList