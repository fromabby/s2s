import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import aboutReducer from "../reducers/aboutReducer"

const AboutContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const AboutContextProvider = props => {
    const [about, dispatch] = useReducer(aboutReducer, {
        about: {},
        abouts: []
    })

    const getAbout = async (id) => {
        try {
            dispatch({ type: "GET_ABOUT_REQUEST" })

            const { data } = await axios.get(`/api/v1/admin/about/${id}`)

            console.log('aboutContext data=', data)
            dispatch({ type: "GET_ABOUT_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_ABOUT_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createAbout = async (about) => {
        try {
            dispatch({ type: "CREATE_ABOUT_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/about/new', about, config)

            dispatch({
                type: "CREATE_ABOUT_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_ABOUT_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_ABOUT_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_ABOUT_RESET" })
        }
    }

    const updateAbout = async (id, about) => {
        try {
            dispatch({ type: "UPDATE_ABOUT_REQUEST" })

            const { data } = await axios.put(`/api/v1/admin/about/${id}`, about, config)

            dispatch({
                type: "UPDATE_ABOUT_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_ABOUT_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_ABOUT_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_ABOUT_RESET" })
        }
    }

    const deleteAbout = async (id) => {
        try {
            dispatch({ type: "DELETE_ABOUT_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/about/${id}`)

            dispatch({
                type: "DELETE_ABOUT_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_ABOUT_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_ABOUT_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_ABOUT_RESET" })
        }
    }

    // useEffect(() => {
    //     let isMounted = true
    //     if(isMounted) {
    //         getAbout('623188af8043f5ab4fa8684b')
    //     }
    //     return () => isMounted = false
    // },[])

    return (
        <AboutContext.Provider value={{ about, getAbout, createAbout, updateAbout, deleteAbout }}>
            { props.children}
        </AboutContext.Provider >
    )

};

export default AboutContext