import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
import commentReducer from "../reducers/commentReducer";

const CommentContext = createContext({})

export const CommentContextProvider = props => {
    const [commentState, dispatch] = useReducer(commentReducer, { 
        currentUser: {}
     })

     console.log(commentState)
    const getCurrentUser = async () => {
        dispatch({ type: "GET_CURRENT_USER_REQUEST" })
        try {
            console.log('insider here')
            const { data } = await axios.get('/api/v1/viewer')
            dispatch({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })
        }
        catch (error) {
            dispatch({ type: "GET_CURRENT_USER_FAIL", payload: error })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const verifyUser = async (email, post_id) => {
        try {
            dispatch({ type: "GET_CURRENT_USER_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email, post_id }, config)

            dispatch({ type: "GET_CURRENT_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatch({ type: "SET_CURRENT_USER_FAIL", payload: error })
            dispatch({ type: "CLEAR_ERRORS" })
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