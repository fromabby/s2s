import React, { useContext } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import Blog from './Blog'
import './Blog.css'

const BlogList = () => {

  const { posts: data, archiveData } = useContext(PostContext)
  const { posts, isLoading } = data


  return (
    isLoading ? <>Loading</>
      :
      <div className='manage-post-div'>
        <div className='create-button'>
          <Link to="/admin/blog/new">
            <Button className='btn-success'>New Post</Button>
          </Link>
        </div>
        <Table responsive="sm">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">IMAGE</th>
              <th scope="col">TITLE</th>
              <th scope="col">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {
              posts.map((post, index) => (
                !post.isArchived &&
                <Blog post={post} archivePost={archiveData} index={index+1} />
              ))
            }
          </tbody>
        </Table>
      </div>
  )
}

export default BlogList