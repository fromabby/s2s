const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "LOGIN_REQUEST":
        case "LOAD_USER_REQUEST":
            return {
                loading: true,
                isAuthenticated: false
            }

        case "LOGIN_SUCCESS":
        case "LOAD_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case "LOGOUT_SUCCESS":
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case "LOAD_USER_FAIL":
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                loadError: action.payload
            }

        case "LOGIN_FAIL":
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case "LOGOUT_FAIL":
            return {
                ...state,
                error: action.payload
            }

        case "CLEAR_ERRORS":
            return {
                ...state,
                loadError: null,
                error: null
            }

        default:
            return state
    }
}

export default authReducer