import React, { useContext } from 'react'
import CommentContext from '../../../../context/commentContext'
import { Button } from 'react-bootstrap'

const Comment = ({ comment }) => {
    const { commentState, deleteComment } = useContext(CommentContext)
    
    return (
        <>
            <div className="content-section-comment">
                <h1 style={{ fontStyle: "2vw" }} className={comment.user ? "content-name" : "content-name text-muted"}>
                    {comment?.user ? comment.user.email : 'Deleted account'}
                </h1>
                <p style={{ fontStyle: "2vw" }} className="content-comment">
                    {comment?.content}
                    {commentState?.currentUser?.email === comment.user.email &&
                        <Button className='btn btn-danger' onClick={() => deleteComment(comment._id)}>Delete</Button>}
                </p>
            </div>
        </>
    )
}

export default Comment