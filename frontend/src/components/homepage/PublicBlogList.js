import React, { useContext, useEffect, useState } from "react";
import PostContext from "../../context/postContext";
import BlogCard from "./blog/BlogCard";
import Metadata from "../layout/Metadata";
import "./css/Blog.css";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import Pagination from 'react-js-pagination'
import Load from "../layout/Load";
import axios from 'axios'

const PublicBlogList = ({ title }) => {
    const [posts, setPosts] = useState([])
    const [resPerPage, setResPerPage] = useState(0)
    const [postCount, setPostCount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    const [searchQuery, setSearchQuery] = useState('');
    const [categoryQuery, setCategoryQuery] = useState('');
    

    // const sortedPosts = posts.sort(function (a, b) {
    //     return (
    //         new Date(b.createdAt || b.updatedAt) -
    //         new Date(a.createdAt || a.updatedAt)
    //     );
    // });

    // useEffect(() => {
    //     if (categoryQuery === "-") {
    //         let filteredPost = sortedPosts.filter((post) =>
    //             post.title.toLowerCase().includes(searchQuery.toLowerCase())
    //         );
    //         setPostList(filteredPost);
    //     } else {
    //         let filteredPost = [];
    //         if (searchQuery) {
    //             let newPostList = sortedPosts.filter((post) =>
    //                 post.category.toLowerCase().includes(categoryQuery.toLowerCase())
    //             );
    //             filteredPost = newPostList.filter((post) =>
    //                 post.title.toLowerCase().includes(searchQuery.toLowerCase())
    //             );
    //         } else {
    //             filteredPost = sortedPosts.filter((post) =>
    //                 post.category.toLowerCase().includes(categoryQuery.toLowerCase())
    //             );
    //         }
    //         setPostList(filteredPost);
    //     }
    // }, [searchQuery, categoryQuery, posts]);

    useEffect(() => {
        const getPosts = async (currentPage, searchQuery, categoryQuery) => {
            try {
                const { data } = await axios.get(`/api/v1/posts?page=${currentPage}${searchQuery ? `&title=${searchQuery}` : ``}${categoryQuery ? `&category=${categoryQuery}` : ``}`)

                if (data.success) {
                    setPosts(data.posts)
                    setResPerPage(data.resPerPage)
                    setPostCount(data.postCount)
                    setLoading(false)
                }
            }
            catch (error) {
                setLoading(false)
            }
        }
        
        getPosts(currentPage, searchQuery, categoryQuery)
    }, [currentPage, searchQuery, categoryQuery])

    const setCurrentPageNumber = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    return loading ? (
        <Load />
    ) : (
        <div>
            <Metadata title={title} />
            <div id="blog">
                <div className="filter-container">
                    <Form.Control
                        type="text"
                        className="searchField"
                        placeholder="Search title..."
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Form.Select
                        className="selectField"
                        name="category"
                        value={categoryQuery}
                        onChange={(e) => setCategoryQuery(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        <option value="Call For Help">Call For Help</option>
                        <option value="Children’s rights">Children’s rights</option>
                        <option value="Environment">Environment</option>
                        <option value="Health">Health</option>
                        <option value="Partnerships">Partnerships</option>
                    </Form.Select>
                    <Button
                        style={{ marginLeft: "10px", width: "fit-content" }}
                        className="admin-button primary"
                        onClick={() => {
                            setSearchQuery('');
                            setCategoryQuery('');
                        }}
                    >
                        Clear Filter
                    </Button>
                </div>

                <div className="recent1">
                    {posts &&
                        posts
                            .filter((post) => !post.isArchived)
                            .map(
                                (post, index) => <BlogCard post={post} />
                            )}
                </div>
                {/*                 
                <div className="recent1">
                    {postList &&
                        postList
                            .filter((post) => !post.isArchived)
                            .map(
                                (post, index) => index < maxDisplay && <BlogCard post={post} />
                            )}
                </div> */}

                <div className='d-flex justify-content-center mt-5'>
                    <Pagination
                        activePage={currentPage}
                        // itemsCountPerPage={resPerPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={postCount}
                        onChange={setCurrentPageNumber}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass={"page-item"}
                        linkClass={"page-link"}
                    />
                </div>
            </div>
        </div>
    );
};

export default PublicBlogList;
