import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostContext from '../../context/postContext'
import { useNavigate } from 'react-router-dom'
import CommentBox from './blog/comments/CommentBox'
import CommentList from './blog/comments/CommentList'
import Metadata from '../layout/Metadata'
import CommentContext, { CommentContextProvider } from '../../context/commentContext'
import './css/BlogDetails.css'

const PublicBlogDetails = () => {
    const { id } = useParams()
    const { posts, fetchSingleData } = useContext(PostContext)
    const { commentState, getAllComments } = useContext(CommentContext)

    const { currentUser, isVerified, isLoading: userLoading, error: userError, commentList } = commentState


    const [isPosted, setIsPosted] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            fetchSingleData(id)
            getAllComments(id)
            // getCurrentUser()
        }
        return () => isMounted = false
    }, [])

    const { isLoading, post, error } = posts

    useEffect(() => {
        if (error) {
            navigate('/')
        }
    }, [error])

    return (
        <>
            <Metadata title={post.title} />
            {
                !isLoading ?
                    post ?
                        <div
                            className="bg_image content-container"
                            style={{
                                backgroundImage: `url(/public/images/bg.png)`,
                                backgroundSize: "cover"
                            }}>
                            <div className="content-body">
                                <div className="container-md">
                                    <h1 className="content-title" style={{ fontStyle: "5vw" }}>
                                        {
                                            post.title
                                        }
                                    </h1>
                                    <p className="content-author-date" style={{ fontStyle: "1vw" }}>
                                        By {post.author} |{" "}
                                        {new Date().toLocaleDateString("en-US", { timeZone: "UTC" })}
                                    </p>
                                    {
                                        post.images && post.images.map(({ path }) => (
                                            <img src={path} alt="test" style={{ width: "100%" }} />
                                        ))
                                    }
                                    <p className="content-paragraph" style={{ fontStyle: "3vw" }}>
                                        {post.content}
                                    </p>
                                    <hr className="content-line" />
                                    <h1 className="content-comment-header" style={{ fontStyle: "2vw" }}>
                                        Comments
                                    </h1>
                                    <CommentList isPosted={isPosted} setIsPosted={setIsPosted} comments={commentList}/>
                                    <CommentBox post_id={post._id} isPosted={isPosted} setIsPosted={setIsPosted} />
                                </div>
                            </div>
                        </div>
                        : ''
                    : <>Loading</>
            }
        </>
    )
}

export default PublicBlogDetails