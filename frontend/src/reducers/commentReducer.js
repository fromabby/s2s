const commentReducer = (state, action) => {
    switch (action.type) {
        //current user
        case "SET_CURRENT_USER_REQUEST":
        case "GET_CURRENT_USER_REQUEST":
            return {...state, isLoading: true, isVerified: false }

        case "SET_CURRENT_USER_SUCCESS":
        case "GET_CURRENT_USER_SUCCESS":
            return { ...state, isLoading: false, isVerified: true, currentUser: action.payload }

        case "SET_CURRENT_USER_FAIL":
            return { ...state, isLoading: false, isVerified: false, error: action.payload }

        case "GET_CURRENT_USER_FAIL":
            return {...state, isLoading: false, isVerified: false, error: action.payload }

        case "SET_CURRENT_USER_RESET":
        case "GET_CURRENT_USER_RESET":
            return { ...state, isLoading: false, error: null }

        default:
            return state
    }
}

export default commentReducer