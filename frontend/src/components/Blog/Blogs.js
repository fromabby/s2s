import React, { useContext } from 'react'
import PostContext from '../../context/postContext'
import Blog from './Blog'
import './Blog.css'

const Blogs = () => {

  const { posts, createPost: onCreate, deletePost } = useContext(PostContext)

  const createPost = () => {
    onCreate({ title: "New Post", body: "New Post Description", id: (posts.length + 1) })
  }

  return (
    <div id="blog">
      <div class="recent1">
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
        <Blog />
      </div>
    </div>

  )
}

export default Blogs