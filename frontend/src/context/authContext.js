import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import authReducer from "../reducers/authReducer"

const AuthContext = createContext({})

export const AuthContextProvider = props => {
    const [auth, dispatch] = useReducer(authReducer, {
        loading: false,
        isAuthenticated: false,
        user: {},
        error: null
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

            const { data } = await axios.get('/api/v1/me/profile', {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            dispatch({ type: "LOAD_USER_SUCCESS", payload: data.user })

        } catch (error) {
            dispatch({ type: "LOAD_USER_FAIL", payload: error.response.data.message })
            dispatch({ type: "CLEAR_ERRORS" })
            console.log('dispatched clear errors')
        }
    }

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            login()
            loadUser()
        }
        return () => isMounted = false
    }, [])

    return (
        <AuthContext.Provider value={{ auth, login, logout, loadUser }
        }>
            { props.children}
        </AuthContext.Provider >
    )

};

export default AuthContext