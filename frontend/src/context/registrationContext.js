import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import registrationReducer from "../reducers/registrationReducer"

const RegistrationContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const RegistrationContextProvider = props => {
    const [registration, dispatch] = useReducer(registrationReducer, {
        registration: {},
        registrations: []
    })

    const getRegistration = async (id) => {
        try {
            dispatch({ type: "GET_REGISTRATION_REQUEST" })

            const { data } = await axios.get(`/api/v1/admin/registration/${id}`)

            console.log('registrationContext data=', data)
            dispatch({ type: "GET_REGISTRATION_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_REGISTRATION_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createRegistration = async (registration) => {
        try {
            dispatch({ type: "CREATE_REGISTRATION_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/registration/new', registration, config)

            dispatch({
                type: "CREATE_REGISTRATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_REGISTRATION_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_REGISTRATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_REGISTRATION_RESET" })
        }
    }

    const updateRegistration = async (id, registration) => {
        try {
            dispatch({ type: "UPDATE_REGISTRATION_REQUEST" })

            const { data } = await axios.put(`/api/v1/admin/registration/${id}`, registration, config)

            dispatch({
                type: "UPDATE_REGISTRATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_REGISTRATION_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_REGISTRATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_REGISTRATION_RESET" })
        }
    }

    const deleteRegistration = async (id) => {
        try {
            dispatch({ type: "DELETE_REGISTRATION_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/registration/${id}`)

            dispatch({
                type: "DELETE_REGISTRATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_REGISTRATION_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_REGISTRATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_REGISTRATION_RESET" })
        }
    }

    // useEffect(() => {
    //     let isMounted = true
    //     if(isMounted) {
    //         getRegistration('623188af8043f5ab4fa8684b')
    //     }
    //     return () => isMounted = false
    // },[])

    return (
        <RegistrationContext.Provider value={{ registration, getRegistration, createRegistration, updateRegistration, deleteRegistration }}>
            { props.children}
        </RegistrationContext.Provider >
    )

};

export default RegistrationContext