import React, { useContext, useState } from 'react'
import PostContext from '../../context/postContext'
import BlogCard from './blog/BlogCard'
import Metadata from '../layout/Metadata'
import './css/Blog.css'
import { Button } from 'react-bootstrap'

const PublicBlogList = ({ title }) => {

    const { posts: postData } = useContext(PostContext)
    const { isLoading, posts } = postData
    const [maxDisplay, setMaxDisplay] = useState(8)

    const changeMaxHandler = () => {
        if (maxDisplay === 8) {
            setMaxDisplay(posts.length)
        }
        else {
            setMaxDisplay(8)
        }
    }

    return (
        <>
            <Metadata title={title} />
            {
                isLoading ? <>Loading</> :
                    <div id="blog">
                        <div class="recent1">
                            {
                                posts && posts.map((post, index) => (
                                    index < maxDisplay
                                        ? <BlogCard post={post} />
                                        : ''
                                ))
                            }
                        </div>
                        <Button onClick={changeMaxHandler}>
                            {
                                maxDisplay === 8 ? 'See More' : 'See Less'
                            }
                        </Button>
                    </div>
            }
        </>

    )
}

export default PublicBlogList