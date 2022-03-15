import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import postReducer from "../reducers/postReducer";
import { CommentContextProvider } from "./commentContext";

const PostContext = createContext({})

export const PostContextProvider = props => {

    const [posts, dispatchPost] = useReducer(postReducer,
        {
            posts: [],
            post: {},
            user: {},
            error: null
        })


    //get all posts
    const getCurrentUser = async () => {
        dispatchPost({ type: "GET_CURRENT_USER_REQUEST" })
        try {
            const { data } = await axios.get('/api/v1/viewer')
            dispatchPost({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })
        }
        catch (error) {
            dispatchPost({ type: "GET_CURRENT_USER_FAIL", payload: error })
        }
    }

    //get all posts
    const fetchData = async () => {
        dispatchPost({ type: "GET_ALL_POST_REQUEST" })
        try {
            const { data } = await axios.get('/api/v1/posts')
            dispatchPost({ type: "GET_ALL_POST_SUCCESS", payload: data.posts })
        }
        catch (error) {
            dispatchPost({ type: "GET_ALL_POST_FAIL", payload: error })
        }
    }

    //get individual post
    const fetchSingleData = async (id) => {
        dispatchPost({ type: "GET_POST_REQUEST" })
        try {
            const { data } = await axios.get(`/api/v1/posts/${id}`)
            dispatchPost({ type: "GET_POST_SUCCESS", payload: data.post })
        }
        catch (error) {
            dispatchPost({ type: "GET_POST_FAIL", payload: error })
        }
    }

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            fetchData()
        }
        return () => isMounted = false
    }, [])

    const deleteData = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/posts/${id}`)
            dispatchPost({ type: "DELETE_POST_SUCCESS", payload: id })
        }
        catch (error) {
            dispatchPost({ type: "DELETE_POST_FAIL", payload: error })
        }
    }

    const archiveData = async (post) => {
        try {
            const { data } = await axios.put(`/api/v1/posts/${post._id}`, { ...post, isArchived: !post.isArchived })
            const postIndex = posts.posts.findIndex(postData => post === postData)
            const newPostList = posts.posts
            newPostList.splice(postIndex, 1, data.post)
            dispatchPost({ type: "UPDATE_POST_SUCCESS", payload: newPostList })
        }
        catch (error) {
            dispatchPost({ type: "UPDATE_POST_FAIL", payload: error })
        }
    }

    const updateData = async (post, newPost) => {
        try {
            const postIndex = posts.posts.findIndex(postData => post === postData)
            const newPostList = posts.posts
            newPostList.splice(postIndex, 1, newPost)
            dispatchPost({ type: "UPDATE_POST_SUCCESS", payload: newPostList })
        }
        catch (error) {
            dispatchPost({ type: "UPDATE_POST_FAIL", payload: error })
        }
    }


    const addData = async (post) => {
        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/v1/posts', post, multiformdata)
            dispatchPost({ type: "ADD_POST_SUCCESS", payload: data.post })

        }
        catch (error) {
            dispatchPost({ type: "ADD_POST_FAIL", payload: error })
        }
    }

    return (
        <PostContext.Provider value={{ posts, fetchSingleData, deleteData, addData, archiveData, updateData }}>
                {props.children}
        </PostContext.Provider>
    )
}

export default PostContext