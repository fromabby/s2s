import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import commentReducer from "../reducers/commentReducer";

const CommentContext = createContext({})

export const CommentContextProvider = props => {
    const [commentState, dispatchUser] = useReducer(commentReducer, {
        currentUser: {},
        commentList: []
    })

    const getCurrentUser = async () => {
        dispatchUser({ type: "GET_CURRENT_USER_REQUEST" })
        try {
            const { data } = await axios.get('/api/v1/viewer')
            dispatchUser({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })
        }
        catch (error) {
            dispatchUser({ type: "GET_CURRENT_USER_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }


    const verifyUser = async (email, post_id) => {
        try {
            dispatchUser({ type: "GET_CURRENT_USER_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email: email, post_id: post_id }, config)

            dispatchUser({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatchUser({ type: "SET_CURRENT_USER_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const getAllComments = async (id) => {
        try {
            dispatchUser({ type: "GET_ALL_COMMENTS_REQUEST" })
            const { data } = await axios.get(`/api/v1/${id}/responses/0`)
            dispatchUser({ type: "GET_ALL_COMMENTS_SUCCESS", payload: data.responses })
        }
        catch (error) {
            dispatchUser({ type: "GET_ALL_COMMENTS_FAIL", payload: error })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const addComment = async (comment, post_id) => {
        try {
            const { data } = await axios.post(`/api/v1/responses/${post_id}`, { content: comment }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            dispatchUser({ type: "ADD_COMMENT_SUCCESS", payload: data.response })
        }
        catch (error) {
            dispatchUser({ type: "ADD_COMMENT_FAIL", payload: error })
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


    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            getCurrentUser()
        }
        return () => isMounted = false
    }, [])

    console.log(commentState.currentUser)

    return (
        <CommentContext.Provider value={{ commentState, verifyUser, getCurrentUser, getAllComments, addComment, deleteComment }}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentContext