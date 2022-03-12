import React, { useContext } from 'react'
import PostContext from '../../context/postContext'
import Blog from './Blog'
import Metadata from '../Layout/Metadata'
import './Blog.css'

const Blogs = () => {

    const { posts: postData } = useContext(PostContext)
    const { isLoading, posts } = postData

    return (
        <>
            <Metadata title={`Blogs`} />
            {
                isLoading ? <>Loading</> :
                    <div id="blog">
                        <div class="recent1">
                            {
                                posts && posts.map(post => <Blog post={post} />)
                            }
                        </div>
                    </div>
            }
        </>

    )
}

export default Blogs