import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostContext from '../../context/postContext'
import './Content.css'
import CommentBox from '../Comments/CommentBox'
import CommentList from '../Comments/CommentList'

const Content = () => {

    const { id } = useParams()
    const { posts, fetchSingleData } = useContext(PostContext)

    useEffect(() => {
        let isMounted = true
        if (isMounted) {
            fetchSingleData(id)
        }
        return () => isMounted = false
    }, [])

    const { isLoading, post } = posts


    return (
        !isLoading && post ?
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
                            By {post?.author?.full_name} |{" "}
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
                        <CommentList />
                        <CommentBox post_id={post._id}/>
                    </div>
                </div>
            </div>
            :
            <>Loading</>
    )
}

export default Content