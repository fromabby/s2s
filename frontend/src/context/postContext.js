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
    // const getCurrentUser = async () => {
    //     dispatchPost({ type: "GET_CURRENT_USER_REQUEST" })
    //     try {
    //         const { data } = await axios.get('/api/v1/viewer')
    //         dispatchPost({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })
    //     }
    //     catch (error) {
    //         dispatchPost({ type: "GET_CURRENT_USER_FAIL", payload: error })
    //     }
    // }

    //get all posts
    const fetchData = async () => {
        dispatchPost({ type: "GET_ALL_POST_REQUEST" })
        try {
            const { data } = await axios.get('/api/v1/posts')
            let sortedPostList = data.posts
            dispatchPost({ type: "GET_ALL_POST_SUCCESS", payload: sortedPostList })
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
            const { data } = await axios.put(`/api/v1/posts/${post._id}`, { ...post, isArchived: !post.isArchived, isFeature: false, isSubFeature: false })
            const postIndex = posts.posts.findIndex(postData => post === postData)
            const newPostList = posts.posts
            newPostList.splice(postIndex, 1, data.post)
            let sortedPostList = newPostList.sort(function (a, b) {
                return a.createdAt - b.createdAt;
            });
            dispatchPost({ type: "UPDATE_POST_SUCCESS", payload: sortedPostList })
        }
        catch (error) {
            dispatchPost({ type: "UPDATE_POST_FAIL", payload: error })
        }
    }

    const updateData = async (post, newPost) => {
        try {
            dispatchPost({ type: "UPDATE_POST_REQUEST" })
            const postIndex = posts.posts.findIndex(postData => post._id === postData._id)
            const newPostList = posts.posts
            newPostList.splice(postIndex, 1, newPost)
            let sortedPostList = newPostList

            dispatchPost({ type: "UPDATE_POST_SUCCESS", payload: sortedPostList })
        }
        catch (error) {
            dispatchPost({ type: "UPDATE_POST_FAIL", payload: error })
        }
    }


    const addData = async (post) => {
        try {
            dispatchPost({ type: "ADD_POST_REQUEST" })
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