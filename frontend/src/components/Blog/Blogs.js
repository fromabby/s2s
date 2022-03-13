import React, { useContext, useState } from 'react'
import PostContext from '../../context/postContext'
import Blog from './Blog'
import Metadata from '../Layout/Metadata'
import './Blog.css'
import { Button } from 'react-bootstrap'

const Blogs = () => {

    const { posts: postData } = useContext(PostContext)
    const { isLoading, posts } = postData
    const [maxDisplay, setMaxDisplay] = useState(8)

    const changeMaxHandler = () => {
        if(maxDisplay === 8){
            setMaxDisplay(posts.length)
        }
        else{
            setMaxDisplay(8)
        }
    }

    return (
        <>
            <Metadata title={`Blogs`} />
            {
                isLoading ? <>Loading</> :
                    <div id="blog">
                        <div class="recent1">
                            {
                                posts && posts.map((post, index) => (
                                    index < maxDisplay
                                        ? <Blog post={post} />
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

export default Blogs