import React, { useContext, useState } from 'react'
import CommentContext from '../../../../context/commentContext'
import { Button } from 'react-bootstrap'

const Comment = ({ comment }) => {
    const { commentState, deleteComment } = useContext(CommentContext)

    const deleteHandler = (id) => {
        if(window.confirm('Are you sure you want to delete?')) {
            deleteComment(id)
        }
    }

    return (
        <>
            <div className="content-section-comment">
                <h1 style={{ fontStyle: "2vw" }} className={comment.user ? "content-name" : "content-name text-muted"}>
                    {comment.user ? comment.user.full_name : 'Deleted account'}
                </h1>
                <p style={{ fontStyle: "2vw" }} className="content-comment">
                    {comment?.content}
                    {
                        commentState &&
                            commentState.currentUser?.user?.email === (comment.user ? comment.user.email : 'Deleted account') ?
                            <Button className='btn btn-danger' onClick={() => deleteHandler(comment._id)}>Delete</Button> :
                            ''
                    }
                    {/* {commentState?.currentUser?.email === commenter &&
                        <Button className='btn btn-danger' onClick={() => deleteComment(comment._id)}>Delete</Button>} */}
                </p>
            </div>
        </>
    )
}

export default Comment