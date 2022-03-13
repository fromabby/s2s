import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import axios from 'axios'

const CommentBox = ({ post_id, setIsPosted, isPosted }) => {
    const [isVerified, setIsVerified] = useState('')
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [verifyLoading, setVerifyLoading] = useState(false)
    const [commentLoading, setCommentLoading] = useState(false)

    const navigate = useNavigate()
    const alert = useAlert()

    const submitHandler = e => {
        e.preventDefault()

        if (isVerified) {
            postComment()
        } else {
            verifyUser()
        }
    }

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
                setComment('')
                alert.success(`Comment has been posted. Subject for approval`)
            }
        } catch (error) {
            setCommentLoading(false)
            alert.error('cannot post comment')
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
        }
    }

    return (
        <div className="content-leave-header">
            <form onSubmit={submitHandler}>
                {isVerified ?
                    <Form.Group className="mb-3">
                        <Form.Label>Leave a comment</Form.Label>
                        <Form.Control type="text" name="comment" placeholder="Leave a comment..." value={comment} onChange={e => setComment(e.target.value)} />
                    </Form.Group>
                    :
                    <Form.Group className="mb-3">
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                }

                <Button variant="primary" type="submit" disabled={commentLoading || verifyLoading ? true : false}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CommentBox
