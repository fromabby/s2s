const postReducer = (state, action) => {
    switch (action.type) {
        //all posts
        case "GET_ALL_POST_REQUEST":
            return { ...state, isLoading: true }
        case "GET_ALL_POST_SUCCESS":
            return { ...state, isLoading: false, posts: action.payload }
        case "GET_ALL_POST_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        //individual post
        case "GET_POST_REQUEST":
            return { ...state, isLoading: true }
        case "GET_POST_SUCCESS":
            return { ...state, isLoading: false, post: action.payload }
        case "GET_POST_FAIL":
            return { ...state, isLoading: false, error: action.payload }

        default:
            return { isLoading: false, posts: [] }
    }
}

export default postReducer