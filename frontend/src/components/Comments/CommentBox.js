import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import axios from 'axios'

const CommentBox = () => {
    const [isVerified, setIsVerified] = useState('')
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault()

        fetchData()
    }

    const alert= useAlert()
    const fetchData = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email, post_id: "622c9b364ce6bcf03b8d5ed5" }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.success) {
                setLoading(false)
                navigate(`/verify/${data.slug}`)
            }

        } catch (error) {
            setLoading(false)
            console.log(error.data.response.message)
        }
    }

    return (
        <div className="content-leave-header">
            <form onSubmit={submitHandler}>
                {isVerified ?
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Enter comment" /> :
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
                }
                <input type='submit' value="submit" />
            </form>
        </div>
    )
}

export default CommentBox
