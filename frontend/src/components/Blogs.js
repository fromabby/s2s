import React, { useContext } from 'react'
import PostContext from '../context/postContext'
import Blog from './Blog'

const Blogs = () => {

  const { posts, createPost:onCreate, deletePost} = useContext(PostContext)

  const createPost = () => {
    onCreate({title: "New Post", body: "New Post Description", id: (posts.length + 1)})
  }

  return (
    <>
      {
        posts && posts.map((post, index) => <Blog key={index} blog={post} deletePost={deletePost}/>)
      }
      <button onClick={() => createPost()}>Create Post</button>
    </>
  )
}

export default Blogs