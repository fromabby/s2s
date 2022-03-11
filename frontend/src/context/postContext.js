import { createContext, useState } from "react";

const PostContext = createContext([
    {
        id: 1,
        title: "Title 1",
        body: "Body 1"
    },
    {
        id: 2,
        title: "Title 2",
        body: "Body 2"
    }
])

export const PostContextProvider = props => {

    const [posts, setPosts] = useState(
        [
            {
                title: "Title 1",
                body: "Body 1"
            },
            {
                title: "Title 2",
                body: "Body 2"
            }
        ]
    )


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }

    const deletePost = (id) => {
        setPosts(posts.filter(post => post.id !== id))
    }


    return (
        <PostContext.Provider value={{ posts, createPost, deletePost }}>
            {props.children}
        </PostContext.Provider>
    )
}

export default PostContext