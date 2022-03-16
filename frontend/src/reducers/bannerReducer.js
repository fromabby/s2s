const bannerReducer = (state, action) => {
    switch (action.type) {
        //get ba content
        case "GET_BANNER_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "GET_BANNER_SUCCESS":
            return {
                loading: false,
                success: action.payload.success,
                banner: action.payload.banner
            }

        case "GET_BANNER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //manage banner content
        case "CREATE_BANNER_REQUEST":
        case "UPDATE_BANNER_REQUEST":
        case "DELETE_BANNER_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_BANNER_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_BANNER_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message
            }

        case "DELETE_BANNER_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_BANNER_FAIL":
        case "UPDATE_BANNER_FAIL":
        case "DELETE_BANNER_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_BANNER_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_BANNER_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_BANNER_RESET":
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

export default bannerReducer