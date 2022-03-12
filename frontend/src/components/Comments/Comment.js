import React from 'react'

const Comment = ({ comment }) => {
    return (
        <div className="content-section-comment">
            <h1 style={{ fontStyle: "2vw" }} className="content-name">
                {comment.user.email}
            </h1>
            <p style={{ fontStyle: "2vw" }} className="content-comment">
                {comment.content}
            </p>
        </div>
    )
}

export default Comment