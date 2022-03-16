import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import userReducer from "../reducers/userReducer"

const UserContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const UserContextProvider = props => {
    const [user, dispatch] = useReducer(userReducer, {
        user: {},
        users: []
    })

    const getUser = async (id) => {
        try {
            dispatch({ type: "GET_USER_REQUEST" })

            const { data } = await axios.get(`/api/v1/admin/user/${id}`)

            console.log('userContext data=', data)
            dispatch({ type: "GET_USER_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_USER_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createUser = async (user) => {
        try {
            dispatch({ type: "CREATE_USER_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/user/new', user, config)

            dispatch({
                type: "CREATE_USER_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_USER_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_USER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_USER_RESET" })
        }
    }

    const updateUser = async (id, user) => {
        try {
            dispatch({ type: "UPDATE_USER_REQUEST" })

            const { data } = await axios.put(`/api/v1/admin/user/${id}`, user, config)

            dispatch({
                type: "UPDATE_USER_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_USER_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_USER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_USER_RESET" })
        }
    }

    const deleteUser = async (id) => {
        try {
            dispatch({ type: "DELETE_USER_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

            dispatch({
                type: "DELETE_USER_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_USER_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_USER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_USER_RESET" })
        }
    }

    return (
        <UserContext.Provider value={{ user, getUser, createUser, updateUser, deleteUser }}>
            { props.children}
        </UserContext.Provider >
    )

};

export default UserContext