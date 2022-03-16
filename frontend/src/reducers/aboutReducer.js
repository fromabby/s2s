const aboutReducer = (state, action) => {
    switch (action.type) {
        case "CREATE_ABOUT_REQUEST":
        case "UPDATE_ABOUT_REQUEST":
        case "DELETE_ABOUT_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_ABOUT_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_ABOUT_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case "DELETE_ABOUT_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_ABOUT_FAIL":
        case "UPDATE_ABOUT_FAIL":
        case "DELETE_ABOUT_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_ABOUT_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_ABOUT_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_ABOUT_RESET":
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

export default aboutReducer