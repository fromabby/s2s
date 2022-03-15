const passwordReducer = (state = {}, action) => {
    switch (action.type) {

        case "FORGOT_PASSWORD_REQUEST":
        case "NEW_PASSWORD_REQUEST":
            return {
                ...state,
                loading: true,
                error: null
            }

        case "FORGOT_PASSWORD_SUCCESS":
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case "NEW_PASSWORD_SUCCESS":
            return {
                ...state,
                success: action.payload
            }

        case "FORGOT_PASSWORD_FAIL":
        case "NEW_PASSWORD_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "FORGOT_PASSWORD_RESET":
            return {
                loading: false
            }

        case "NEW_PASSWORD_RESET":
            return {
                ...state,
                loading: false
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

export default passwordReducer