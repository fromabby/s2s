import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import commentReducer from "../reducers/commentReducer";

const CommentContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}


export const CommentContextProvider = props => {
    const [commentState, dispatchUser] = useReducer(commentReducer, {
        currentUser: {},
        commentList: [],
        allComments: []
    })

    const getCurrentUser = async () => {
        dispatchUser({ type: "GET_CURRENT_USER_REQUEST" })
        try {
            const { data } = await axios.get('/api/v1/viewer')
            dispatchUser({ type: "GET_CURRENT_USER_SUCCESS", payload: data })
        }
        catch (error) {
            dispatchUser({ type: "GET_CURRENT_USER_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const setUser = async (user, slug) => {
        try {
            dispatchUser({ type: "SET_CURRENT_USER_REQUEST " })

            const { data } = await axios.post(`/api/v1/viewer/create/${slug}`, { full_name: user.name, otp: user.otp }, config)

            dispatchUser({ type: "SET_CURRENT_USER_SUCCESS", payload: data })

        } catch (error) {
            dispatchUser({ type: "SET_CURRENT_USER_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const cancelVerification = async () => {
        dispatchUser({ type: "VERIFY_USER_RESET" })
    }

    const verifyUser = async (email, post_id) => {
        try {
            dispatchUser({ type: "VERIFY_USER_REQUEST" })

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email: email, post_id: post_id }, config)

            dispatchUser({ type: "VERIFY_USER_SUCCESS", payload: data })
            dispatchUser({ type: "VERIFY_USER_RESET" })

        } catch (error) {
            dispatchUser({ type: "VERIFY_USER_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
            dispatchUser({ type: "VERIFY_USER_RESET" })
        }
    }


    const getAllCommentsForAdmin = async () => {
        try {
            dispatchUser({ type: "GET_ALL_COMMENTS_FOR_ADMIN_REQUEST" })
            const { data } = await axios.get(`/api/v1/responses`)
            console.log(data)
            dispatchUser({ type: "GET_ALL_COMMENTS_FOR_ADMIN_SUCCESS", payload: data.responses })
        }
        catch (error) {
            dispatchUser({ type: "GET_ALL_COMMENTS_FOR_ADMIN_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const getAllComments = async (id) => {
        try {
            dispatchUser({ type: "GET_ALL_COMMENTS_REQUEST" })
            const { data } = await axios.get(`/api/v1/${id}/responses/1`)
            dispatchUser({ type: "GET_ALL_COMMENTS_SUCCESS", payload: data.responses })
        }
        catch (error) {
            dispatchUser({ type: "GET_ALL_COMMENTS_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const addComment = async (comment, post_id) => {
        try {
            const { data } = await axios.post(`/api/v1/responses/${post_id}`, { content: comment }, config)
            dispatchUser({ type: "ADD_COMMENT_SUCCESS", payload: data.response })
        }
        catch (error) {
            dispatchUser({ type: "ADD_COMMENT_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const updateComment = async (comment, status) => {
        try {
            const { data } = await axios.put(`/api/v1/responses/${comment._id}`, { ...comment, status: status }, config)
            const index = commentState.allComments.findIndex(response => response._id === comment._id)
            const newAllComments = commentState.allComments
            newAllComments.splice(index, 1, data.response)
            console.log(index, newAllComments)
            dispatchUser({ type: "UPDATE_COMMENT_SUCCESS", payload: newAllComments })
        }
        catch (error) {
            dispatchUser({ type: "UPDATE_COMMENT_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const deleteComment = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/responses/viewer/${id}`)
            dispatchUser({ type: "DELETE_COMMENT_SUCCESS", payload: id })
        }
        catch (error) {
            dispatchUser({ type: "DELETE_COMMENT_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }


    const adminDeleteComment = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/responses/admin/${id}`)
            dispatchUser({ type: "DELETE_COMMENT_SUCCESS", payload: id })
        }
        catch (error) {
            dispatchUser({ type: "DELETE_COMMENT_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }


    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            getCurrentUser()
            getAllCommentsForAdmin()
        }
        return () => isMounted = false
    }, [])

    return (
        <CommentContext.Provider value={{ commentState, verifyUser, setUser, cancelVerification, getCurrentUser, updateComment, adminDeleteComment, getAllComments, getAllCommentsForAdmin, addComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentContext