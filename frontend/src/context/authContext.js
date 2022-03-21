import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import authReducer from "../reducers/authReducer"

const AuthContext = createContext({})

export const AuthContextProvider = props => {
    const [auth, dispatch] = useReducer(authReducer, {
        user: {}
    })

    const login = async (user) => {
        try {
            dispatch({ type: "LOGIN_REQUEST" })

            const { data } = await axios.post('/api/v1/login', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({ type: "LOGIN_SUCCESS", payload: data.user })

        } catch (error) {
            dispatch({ type: "LOGIN_FAIL", payload: error.response.data.message })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const logout = async () => {
        try {
            dispatch({ type: "LOGOUT_REQUEST" })

            await axios.get('/api/v1/logout')

            dispatch({ type: "LOGOUT_SUCCESS" })

        } catch (error) {
            dispatch({ type: "LOGOUT_FAIL", payload: error.response.data.message })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const loadUser = async () => {
        try {
            dispatch({ type: "LOAD_USER_REQUEST" })

            const { data } = await axios.get('/api/v1/me/profile')

            dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }


    const updateProfile = async (user) => {
        try {
            dispatch({ type: "UPDATE_USER_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put('/api/v1/me/update', user, config)

            dispatch({ type: "UPDATE_USER_SUCCESS", payload: data.user })

            dispatch({ type: "UPDATE_USER_RESET" })
        } catch (error) {
            dispatch({ type: "UPDATE_USER_FAIL", payload: error.response.data.message })
            dispatch({ type: "UPDATE_USER_RESET" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const updatePassword = async (passwords) => {
        try {
            dispatch({ type: "UPDATE_PASSWORD_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.put('/api/v1/update/password', passwords, config)

            dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: data.user })
            dispatch({ type: "UPDATE_PASSWORD_RESET" })
        } catch (error) {
            dispatch({ type: "UPDATE_PASSWORD_FAIL", payload: error.response.data.message })
            dispatch({ type: "UPDATE_PASSWORD_RESET" })
            dispatch({ type: "CLEAR_ERRORS" })
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
        <AuthContext.Provider value={{ auth, login, logout, loadUser, updateProfile, updatePassword }}>
            {props.children}
        </AuthContext.Provider >
    )

};

export default AuthContext