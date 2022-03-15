import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import passwordReducer from "../reducers/passwordReducer"

const PasswordContext = createContext({})

export const PasswordContextProvider = props => {
    const [password, dispatch] = useReducer(passwordReducer, {
        loading: false
    })

    const forgotPassword = async (email) => {
        try {
            dispatch({ type: "FORGOT_PASSWORD_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/v1/password/forgot', email, config)

            dispatch({ type: "FORGOT_PASSWORD_SUCCESS", payload: data.message })
            dispatch({ type: "FORGOT_PASSWORD_RESET" })

        }
        catch (error) {
            dispatch({
                type: "FORGOT_PASSWORD_FAIL",
                payload: error.response.data.message
            })
        }
    }

    //reset password
    const resetPassword = async (token, passwords) => {
        try {
            dispatch({ type: "NEW_PASSWORD_REQUEST" })

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            console.log(token)
            const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

            dispatch({ type: "NEW_PASSWORD_SUCCESS", payload: data.success })
            dispatch({ type: "NEW_PASSWORD_RESET" })

        } catch (error) {
            dispatch({ type: "NEW_PASSWORD_FAIL", payload: error.response.data.message })
        }
    }


    useEffect(() => {
        let isMounted = true
        // if (isMounted) {
        //     loadUser()
        // }
        return () => isMounted = false
    }, [])

    return (
        <PasswordContext.Provider value={{ password, forgotPassword, resetPassword }}>
            { props.children}
        </PasswordContext.Provider >
    )

};

export default PasswordContext