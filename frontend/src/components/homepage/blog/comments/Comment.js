import React from 'react'
import { Button } from 'react-bootstrap'

const Comment = ({ comment }) => {

    

    return (
        <div className="content-section-comment">
            <h1 style={{ fontStyle: "2vw" }} className={comment.user ? "content-name" : "content-name text-muted"}>
                {comment?.user ? comment.user.email : 'Deleted account'}
            </h1>
            <p style={{ fontStyle: "2vw" }} className="content-comment">
                {comment?.content}
                <Button className='btn btn-danger'>Delete</Button>
            </p>
        </div>
    )
}

export default Comment