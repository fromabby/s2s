const userReducer = (state, action) => {
    switch (action.type) {
        //get user content
        case "GET_USER_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "GET_USER_SUCCESS":
            return {
                loading: false,
                success: action.payload.success,
                user: action.payload.user
            }

        case "GET_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //manage user content
        case "CREATE_USER_REQUEST":
        case "UPDATE_USER_REQUEST":
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message
            }

        case "DELETE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_USER_FAIL":
        case "UPDATE_USER_FAIL":
        case "DELETE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_USER_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_USER_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_USER_RESET":
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

export default userReducer