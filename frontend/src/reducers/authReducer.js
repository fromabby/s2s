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

        //*USER UPDATE
        case "REGISTER_USER_REQUEST":
        case "UPDATE_PASSWORD_REQUEST":
        case "UPDATE_USER_REQUEST":
        case "DELETE_USER_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "REGISTER_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }

        case "UPDATE_PASSWORD_SUCCESS":
        case "UPDATE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case "DELETE_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "REGISTER_USER_FAIL":
        case "UPDATE_PASSWORD_FAIL":
        case "UPDATE_USER_FAIL":
        case "DELETE_USER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "REGISTER_USER_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_PASSWORD_RESET":
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
                loadError: null,
                error: null
            }

        default:
            return state
    }
}

export default authReducer

// export const userReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//         case "REGISTER_USER_REQUEST":
//         case "UPDATE_PASSWORD_REQUEST":
//         case "UPDATE_USER_REQUEST":
//         case "DELETE_USER_REQUEST":
//             return {
//                 ...state,
//                 loading: true
//             }

//         case "REGISTER_USER_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 isCreated: action.payload,
//                 message: action.payload.message
//             }

//         case "UPDATE_PASSWORD_SUCCESS":
//         case "UPDATE_USER_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 isUpdated: action.payload
//             }

//         case "DELETE_USER_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 isDeleted: action.payload
//             }

//         case "REGISTER_USER_FAIL":
//         case "UPDATE_PASSWORD_FAIL":
//         case "UPDATE_USER_FAIL":
//         case "DELETE_USER_FAIL":
//             return {
//                 ...state,
//                 loading: false,
//                 error: action.payload
//             }

//         case "REGISTER_USER_RESET":
//             return {
//                 ...state,
//                 loading: false,
//                 isCreated: false
//             }

//         case "UPDATE_PASSWORD_RESET":
//         case "UPDATE_USER_RESET":
//             return {
//                 ...state,
//                 loading: false,
//                 isUpdated: false
//             }

//         case "DELETE_USER_RESET":
//             return {
//                 ...state,
//                 loading: false,
//                 isDeleted: false
//             }

//         case "CLEAR_ERRORS":
//             return {
//                 ...state,
//                 loadError: null,
//                 error: null
//             }

//         default:
//             return state
//     }
// }