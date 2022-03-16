const donationReducer = (state, action) => {
    switch (action.type) {
        //get donation content
        case "GET_DONATION_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "GET_DONATION_SUCCESS":
            return {
                loading: false,
                success: action.payload.success,
                donation: action.payload.donation
            }

        case "GET_DONATION_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        //manage donation content
        case "CREATE_DONATION_REQUEST":
        case "UPDATE_DONATION_REQUEST":
        case "DELETE_DONATION_REQUEST":
            return {
                ...state,
                loading: true
            }

        case "CREATE_DONATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isCreated: action.payload,
                message: action.payload.message
            }


        case "UPDATE_DONATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
                message: action.payload.message
            }

        case "DELETE_DONATION_SUCCESS":
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case "CREATE_DONATION_FAIL":
        case "UPDATE_DONATION_FAIL":
        case "DELETE_DONATION_FAIL":
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case "CREATE_DONATION_RESET":
            return {
                ...state,
                loading: false,
                isCreated: false
            }

        case "UPDATE_DONATION_RESET":
            return {
                ...state,
                loading: false,
                isUpdated: false
            }

        case "DELETE_DONATION_RESET":
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

export default donationReducer