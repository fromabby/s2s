import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import bannerReducer from "../reducers/bannerReducer"

const BannerContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export const BannerContextProvider = props => {
    const [banner, dispatch] = useReducer(bannerReducer, {
        banner: {},
        banners: []
    })

    const getBanner = async (id) => {
        try {
            dispatch({ type: "GET_BANNER_REQUEST" })

            const { data } = await axios.get(`/api/v1/admin/banner/${id}`)

            dispatch({ type: "GET_BANNER_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_BANNER_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createBanner = async (banner) => {
        try {
            dispatch({ type: "CREATE_BANNER_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/banner/new', banner, config)

            dispatch({
                type: "CREATE_BANNER_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_BANNER_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_BANNER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_BANNER_RESET" })
        }
    }

    const updateBanner = async (id, banner) => {
        try {
            dispatch({ type: "UPDATE_BANNER_REQUEST" })

            console.log(banner)
            const { data } = await axios.put(`/api/v1/admin/banner/${id}`, banner, config)

            dispatch({
                type: "UPDATE_BANNER_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_BANNER_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_BANNER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_BANNER_RESET" })
        }
    }

    const deleteBanner = async (id) => {
        try {
            dispatch({ type: "DELETE_BANNER_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/banner/${id}`)

            dispatch({
                type: "DELETE_BANNER_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_BANNER_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_BANNER_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_BANNER_RESET" })
        }
    }

    return (
        <BannerContext.Provider value={{ banner, getBanner, createBanner, updateBanner, deleteBanner }}>
            { props.children}
        </BannerContext.Provider >
    )

};

export default BannerContext