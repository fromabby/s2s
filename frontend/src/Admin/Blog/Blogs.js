import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../context/postContext'
import Blog from './Blog'

const Blogs = () => {

  const { posts: data, deleteData } = useContext(PostContext)
  const { posts, isLoading } = data
  return (
    isLoading ? <>Loading</>
      :
      <div>
        {
          posts.map(post => <Blog post={post} deletePost={deleteData} />)
        }
        <Link to="/admin/blog/new">
          <Button>Create Post</Button>
        </Link>
      </div>
  )
}

export default Blogs