const commentReducer = (state, action) => {
    switch (action.type) {
        //current user
        case "RESET_SLUG":
            return {
                ...state,
                isSlug: false
            }
            
        case "VERIFY_USER_REQUEST":
            return {
                ...state,
                isLoading: true,
                isSlug: false,
                currentUser: {}
            }
        case "CREATE_USER_REQUEST":
        case "GET_CURRENT_USER_REQUEST":
            return { ...state, isLoading: true, isVerified: false }

        case "VERIFY_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isSlug: action.payload.success,
                currentUser: action.payload,
                slug: action.payload.slug
            }

        case "CREATE_USER_SUCCESS":
        case "GET_CURRENT_USER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isVerified: true,
                currentUser: action.payload
            }

        case "VERIFY_USER_FAIL":
            return {
                ...state,
                isLoading: false,
                isSlug: false,
                error: action.payload
            }

        case "CREATE_USER_FAIL":
            return { ...state, isLoading: false, isVerified: false, createError: action.payload }

        case "GET_CURRENT_USER_FAIL":
            return { ...state, isLoading: false, isVerified: false, error: action.payload }

        case "VERIFY_USER_RESET":
            return {
                ...state,
                isLoading: false,
                isSlug: false,
                error: null,
                currentUser: null
            }

        case "SET_CURRENT_USER_RESET":
        case "GET_CURRENT_USER_RESET":
            return {
                ...state,
                isLoading: false,
                error: null,
                isVerified: false,
                currentUser: null
            }


        case "GET_ALL_COMMENTS_REQUEST":
        case "GET_ALL_COMMENTS_FOR_ADMIN_REQUEST":
            return { ...state, isLoading: true }
        case "GET_ALL_COMMENTS_SUCCESS":
            return { ...state, isLoading: false, commentList: action.payload }
        case "GET_ALL_COMMENTS_FOR_ADMIN_SUCCESS":
            return { ...state, isLoading: false, allComments: action.payload }
        case "GET_ALL_COMMENTS_FAIL":
        case "GET_ALL_COMMENTS_FOR_ADMIN_FAIL":
            return { ...state, isLoading: false, error: action.payload }


        case "ADD_COMMENT_SUCCESS":
            return { ...state, isLoading: false, commentList: [...state.commentList, action.payload] }
        case "UPDATE_COMMENT_SUCCESS":
            return { ...state, isLoading: false, commentList: action.payload }
        case "ADD_COMMENT_FAIL":
        case "UPDATE_COMMENT_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        case "DELETE_COMMENT_SUCCESS":
            console.log(action.payload)
            return { ...state, isLoading: false, commentList: state.commentList.filter(comment => comment._id !== action.payload), allComments: state.allComments.filter(comment => comment._id !== action.payload) }
        case "DELETE_COMMENT_FAIL":
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state
    }

}

export default commentReducer