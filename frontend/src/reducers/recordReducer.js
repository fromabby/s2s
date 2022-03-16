const recordReducer = (state, action) => {
    switch (action.type) {
        //get record content
        case "GET_RECORD_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "GET_RECORD_SUCCESS":
            return {
                loading: false,
                success: action.payload.success,
                record: action.payload.record
            }

        case "GET_RECORD_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //manage record content
        case "CREATE_RECORD_REQUEST":
        case "UPDATE_RECORD_REQUEST":
        case "DELETE_RECORD_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message
            }

        case "DELETE_RECORD_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_RECORD_FAIL":
        case "UPDATE_RECORD_FAIL":
        case "DELETE_RECORD_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_RECORD_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_RECORD_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_RECORD_RESET":
            return {
                ...state,
                loading: false,
                isDeleted: false
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export default recordReducer