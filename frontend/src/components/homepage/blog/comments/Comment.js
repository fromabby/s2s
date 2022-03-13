import React from 'react'

const Comment = ({ comment }) => {
    return (
        <div className="content-section-comment">
            <h1 style={{ fontStyle: "2vw" }} className={comment.user ? "content-name" : "content-name text-muted"}>
                {comment?.user ? comment.user.email : 'Deleted account'}
            </h1>
            <p style={{ fontStyle: "2vw" }} className="content-comment">
                {comment?.content}
            </p>
        </div>
    )
}

export default Comment