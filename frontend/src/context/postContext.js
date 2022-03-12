import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

const postReducer = (state, action) => {
    switch (action.type) {
        //all posts
        case "GET_ALL_POST_REQUEST":
            return { ...state, isLoading: true }
        case "GET_ALL_POST_SUCCESS":
            return { ...state, isLoading: false, posts: action.payload }
        case "GET_ALL_POST_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        //individual post
        case "GET_POST_REQUEST":
            return { ...state, isLoading: true }
        case "GET_POST_SUCCESS":
            return { ...state, isLoading: false, post: action.payload }
        case "GET_POST_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        default:
            return { isLoading: false, posts: [] }
    }
}

const PostContext = createContext({})

export const PostContextProvider = props => {

    const [posts, dispatchPost] = useReducer(postReducer,
        {
            isLoading: false,
            posts: [],
            post: {},
            error: null
        })

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


    console.log(posts)

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            fetchData()
        }
        return () => isMounted = false
    }, [])

    return (
        <PostContext.Provider value={{ posts, fetchSingleData }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContext