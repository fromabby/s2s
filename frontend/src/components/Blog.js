import React from 'react'

const Blog = props => {

  const { id, title, body } = props.blog
  const { deletePost } = props

  return (
    <div>
      <h1>{title}</h1>
      <p>{body}</p>
      <p>{id}</p>
      <button onClick={() => deletePost(id)}>Delete</button>
    </div>
  )
}

export default Blog