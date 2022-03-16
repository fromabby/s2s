import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import donationReducer from "../reducers/donationReducer"

const DonationContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
}

export const DonationContextProvider = props => {
    const [donation, dispatch] = useReducer(donationReducer, {
        donation: {},
        donations: []
    })

    const getDonation = async (id) => {
        try {
            dispatch({ type: "GET_DONATION_REQUEST" })

            const { data } = await axios.get(`/api/v1/admin/donation/${id}`)

            console.log('donationContext data=', data)
            dispatch({ type: "GET_DONATION_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_DONATION_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createDonation = async (donation) => {
        try {
            dispatch({ type: "CREATE_DONATION_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/donation/new', donation, config)

            dispatch({
                type: "CREATE_DONATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_DONATION_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_DONATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_DONATION_RESET" })
        }
    }

    const updateDonation = async (id, donation) => {
        try {
            dispatch({ type: "UPDATE_DONATION_REQUEST" })

            const { data } = await axios.put(`/api/v1/admin/donation/${id}`, donation, config)

            dispatch({
                type: "UPDATE_DONATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_DONATION_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_DONATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_DONATION_RESET" })
        }
    }

    const deleteDonation = async (id) => {
        try {
            dispatch({ type: "DELETE_DONATION_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/donation/${id}`)

            dispatch({
                type: "DELETE_DONATION_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_DONATION_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_DONATION_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_DONATION_RESET" })
        }
    }

    return (
        <DonationContext.Provider value={{ donation, getDonation, createDonation, updateDonation, deleteDonation }}>
            { props.children}
        </DonationContext.Provider >
    )

};

export default DonationContext