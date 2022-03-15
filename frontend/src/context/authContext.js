import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import * as auth from "../reducers/authReducer"

const AuthContext = createContext({})

export const AuthContextProvider = props => {
    const [auth, dispatchAuth] = useReducer(auth.authReducer, {
        user: {}
    })
    const [manageUser, dispatchUser] = useReducer(auth.userReducer, {
        user: {}
    })

    const login = async (user) => {
        try {
            dispatchAuth({ type: "LOGIN_REQUEST" })

            const { data } = await axios.post('/api/v1/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatchAuth({ type: "LOGIN_SUCCESS", payload: data.user })

        } catch (error) {
            dispatchAuth({ type: "LOGIN_FAIL", payload: error.response.data.message })
            dispatchAuth({ type: "CLEAR_ERRORS" })
        }
    }

    const logout = async () => {
        try {
            dispatchAuth({ type: "LOGOUT_REQUEST" })

            await axios.get('/api/v1/logout')

            dispatchAuth({ type: "LOGOUT_SUCCESS" })

        } catch (error) {
            dispatchAuth({ type: "LOGOUT_FAIL", payload: error.response.data.message })
            dispatchAuth({ type: "CLEAR_ERRORS" })
        }
    }

    const loadUser = async () => {
        try {
            dispatchAuth({ type: "LOAD_USER_REQUEST" })

            const { data } = await axios.get('/api/v1/me/profile')

            dispatchAuth({ type: "LOAD_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatchAuth({ type: "LOAD_USER_FAIL", payload: error.response.data.message })
            dispatchAuth({ type: "CLEAR_ERRORS" })
        }
    }


    const updateProfile = async (user) => {
        try {
            dispatchUser({
                type: "UPDATE_USER_REQUEST"
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put('/api/v1/me/update', user, config)

            dispatchUser({
                type: "UPDATE_USER_SUCCESS",
                payload: data.user
            })

            dispatchUser({ type: "UPDATE_USER_RESET" })
        } catch (error) {
            dispatchUser({
                type: "UPDATE_USER_FAIL",
                payload: error.response.data.message
            })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    const updatePassword = async (passwords) => {
        try {
            dispatchUser({
                type: "UPDATE_PASSWORD_REQUEST"
            })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put('/api/v1/update/password', passwords, config)

            dispatchUser({
                type: "UPDATE_PASSWORD_SUCCESS",
                payload: data.user
            })
        } catch (error) {
            dispatchUser({
                type: "UPDATE_PASSWORD_FAIL",
                payload: error.response.data.message
            })
            dispatchUser({ type: "CLEAR_ERRORS" })
        }
    }

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            loadUser()
        }
        return () => isMounted = false
    }, [])

    return (
        <AuthContext.Provider value={{ auth, manageUser, login, logout, loadUser, updateProfile, updatePassword }}>
            { props.children}
        </AuthContext.Provider >
    )

};

export default AuthContext