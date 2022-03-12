import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import axios from 'axios'

const CommentBox = ({ post_id }) => {
    const [isVerified, setIsVerified] = useState('')
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)
    const [isPosted, setIsPosted] = useState(false)

    const navigate = useNavigate()

    const submitHandler = e => {
        e.preventDefault()

        if(isVerified) {
            postComment()
        } else {
            verifyUser()
        }
    }

    useEffect(() => {
        
    }, [isVerified])

    const postComment = async () => {
        try {
            setCommentLoading(true)

            const { data } = await axios.post(`/api/v1/responses/${post_id}`, { content: comment }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.success) {
                
                setCommentLoading(false)
                setIsPosted(true)
                navigate(`/blog/${data.response.post}`)
            }

        } catch (error) {
            setCommentLoading(false)
        }
    }

    const verifyUser = async () => {
        try {
            setVerifyLoading(true)

            const { data } = await axios.post(`/api/v1/viewer/verify`, { email, post_id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.success && data.user.status === 0) {
                setVerifyLoading(false)
                navigate(`/verify/${data.slug}`)
            } else if (data.success && data.user.status === 1) {
                setVerifyLoading(false)
                setIsVerified(true)
                //*add to state
            }

        } catch (error) {
            setVerifyLoading(false)
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
                <input type='submit' value="submit" disabled={commentLoading || verifyLoading ? true : false}/>
            </form>
        </div>
    )
}

export default CommentBox
