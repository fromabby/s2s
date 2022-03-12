import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment'

const CommentList = ({ isPosted, setIsPosted }) => {
    const [comments, setComments] = useState([])
    const [isRefreshed, setIsRefreshed] = useState(false)

    const { id } = useParams()

    useEffect(() => {
        if (!isRefreshed) {
            const fetchData = async () => {
                const { data } = await axios.get(`/api/v1/${id}/responses/0`)
                setComments(data.responses)
            }
            fetchData()
            setIsPosted(false)
        }
    }, [id, isPosted])

    return (
        comments && comments.map(comment => (
            <Comment comment={comment} />
        ))
    )
}

export default CommentList