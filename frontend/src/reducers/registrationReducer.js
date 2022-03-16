const registrationReducer = (state, action) => {
    switch (action.type) {
        //get registration content
        case "GET_REGISTRATION_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "GET_REGISTRATION_SUCCESS":
            return {
                loading: false,
                success: action.payload.success,
                registration: action.payload.registration
            }

        case "GET_REGISTRATION_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //manage registration content
        case "CREATE_REGISTRATION_REQUEST":
        case "UPDATE_REGISTRATION_REQUEST":
        case "DELETE_REGISTRATION_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_REGISTRATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_REGISTRATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message,
                registration: action.payload
            }

        case "DELETE_REGISTRATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_REGISTRATION_FAIL":
        case "UPDATE_REGISTRATION_FAIL":
        case "DELETE_REGISTRATION_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_REGISTRATION_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_REGISTRATION_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_REGISTRATION_RESET":
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

export default registrationReducer