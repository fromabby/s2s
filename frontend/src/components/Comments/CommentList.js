import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Comment from './Comment'

const CommentList = () => {

    const [comments, setComments] = useState([])

    const {id} = useParams()

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/v1/${id}/responses/0`)
            setComments(data.responses)
        }
        fetchData()
    }, [id])

    return (
        comments && comments.map(comment => (
            <Comment comment={comment}/>
        ))
    )
}

export default CommentList