import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import Blog from './Blog'

const ArchiveBlogList = () => {

    const { posts: data, archiveData, deleteData } = useContext(PostContext)
    const { posts, isLoading } = data


    return (
        isLoading ? <>Loading</>
            :
            <div>
                <div className='d-flex flex-column'>
                    {
                        posts.map(post => (
                            post.isArchived &&
                            <Blog post={post} archivePost={archiveData} deletePost={deleteData} />
                        ))
                    }
                </div>

            </div>
    )
}

export default ArchiveBlogList