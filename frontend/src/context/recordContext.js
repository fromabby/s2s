import axios from 'axios';
import { createContext, useEffect, useReducer } from 'react'
import recordReducer from "../reducers/recordReducer"

const RecordContext = createContext({})

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}

export const RecordContextProvider = props => {
    const [record, dispatch] = useReducer(recordReducer, {
        record: {},
        records: []
    })

    const getRecord = async (id) => {
        try {
            dispatch({ type: "GET_RECORD_REQUEST" })

            const { data } = await axios.get(`/api/v1/record/${id}`)

            console.log('recordContext data=', data)
            dispatch({ type: "GET_RECORD_SUCCESS", payload: data })

        } catch (error) {
            dispatch({ type: "GET_RECORD_FAIL" })
            dispatch({ type: "CLEAR_ERRORS" })
        }
    }

    const createRecord = async (record) => {
        try {
            dispatch({ type: "CREATE_RECORD_REQUEST" })

            const { data } = await axios.post('/api/v1/admin/record/new', record, config)

            dispatch({
                type: "CREATE_RECORD_SUCCESS",
                payload: data
            })
            dispatch({ type: "CREATE_RECORD_RESET" })
        } catch (error) {
            dispatch({
                type: "CREATE_RECORD_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "CREATE_RECORD_RESET" })
        }
    }

    const updateRecord = async (id, record) => {
        try {
            dispatch({ type: "UPDATE_RECORD_REQUEST" })

            const { data } = await axios.put(`/api/v1/admin/record/${id}`, record, config)

            dispatch({
                type: "UPDATE_RECORD_SUCCESS",
                payload: data
            })
            dispatch({ type: "UPDATE_RECORD_RESET" })
        } catch (error) {
            dispatch({
                type: "UPDATE_RECORD_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "UPDATE_RECORD_RESET" })
        }
    }

    const deleteRecord = async (id) => {
        try {
            dispatch({ type: "DELETE_RECORD_REQUEST" })

            const { data } = await axios.delete(`/api/v1/admin/record/${id}`)

            dispatch({
                type: "DELETE_RECORD_SUCCESS",
                payload: data
            })
            dispatch({ type: "DELETE_RECORD_RESET" })
        } catch (error) {
            dispatch({
                type: "DELETE_RECORD_FAIL",
                payload: error.response.data.message
            })
            dispatch({ type: "CLEAR_ERRORS" })
            dispatch({ type: "DELETE_RECORD_RESET" })
        }
    }

    return (
        <RecordContext.Provider value={{ record, getRecord, createRecord, updateRecord, deleteRecord }}>
            { props.children}
        </RecordContext.Provider >
    )

};

export default RecordContext