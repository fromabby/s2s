import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'

const CommentList = ({ comments }) => {

    return (
        comments && comments.map(comment => (
            comment.status !== 0 && <Comment comment={comment} />
        ))
    )
}

export default CommentList