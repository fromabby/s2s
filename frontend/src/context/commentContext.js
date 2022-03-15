import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import commentReducer from "../reducers/commentReducer";

const CommentContext = createContext({})

export const CommentContextProvider = props => {
    const [commentState, dispatchUser] = useReducer(commentReducer, {
        currentUser: {}
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

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email:email, post_id:post_id }, config)

            dispatchUser({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatchUser({ type: "SET_CURRENT_USER_FAIL", payload: error })
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


    return (
        <CommentContext.Provider value={{ commentState, verifyUser, getCurrentUser }}>
            {props.children}
        </CommentContext.Provider>
    )
}

export default CommentContext