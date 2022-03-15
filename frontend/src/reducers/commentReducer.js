const commentReducer = (state, action) => {
    switch (action.type) {
        //current user
        case "SET_CURRENT_USER_REQUEST":
        case "GET_CURRENT_USER_REQUEST":
            return { ...state, isLoading: true, isVerified: false }

        case "SET_CURRENT_USER_SUCCESS":
        case "GET_CURRENT_USER_SUCCESS":
            return { ...state, isLoading: false, isVerified: true, currentUser: action.payload }

        case "SET_CURRENT_USER_FAIL":
            return { ...state, isLoading: false, isVerified: false, error: action.payload }

        case "GET_CURRENT_USER_FAIL":
            return { ...state, isLoading: false, isVerified: false, error: action.payload }

        case "SET_CURRENT_USER_RESET":
        case "GET_CURRENT_USER_RESET":
            return { ...state, isLoading: false, error: null }


        case "GET_ALL_COMMENTS_REQUEST":
            return { ...state, isLoading: true }
        case "GET_ALL_COMMENTS_SUCCESS":
            return { ...state, isLoading: false, commentList: action.payload }
        case "GET_ALL_COMMENTS_FAIL":
            return { ...state, isLoading: false, error: action.payload }


        case "ADD_COMMENT_SUCCESS":
            return { ...state, isLoading: false, commentList: [...state.commentList, action.payload] }
        case "ADD_COMMENT_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        case "DELETE_COMMENT_SUCCESS":
            return { ...state, isLoading: false, commentList: state.commentList.filter(comment => comment._id !== action.payload) }
        case "DELETE_COMMENT_FAIL":
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state
    }

}

export default commentReducer