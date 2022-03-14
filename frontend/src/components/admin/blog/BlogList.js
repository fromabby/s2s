import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import Blog from './Blog'

const BlogList = () => {

  const { posts: data, archiveData } = useContext(PostContext)
  const { posts, isLoading } = data


  return (
    isLoading ? <>Loading</>
      :
      <div>
        <Link to="/admin/blog/new">Î
          <Button>Create Post</Button>
        </Link>
        <div className='d-flex flex-column'>
          {
            posts.map(post => (
              !post.isArchived &&
              <Blog post={post} archivePost={archiveData} />
            ))
          }
        </div>

      </div>
  )
}

export default BlogList