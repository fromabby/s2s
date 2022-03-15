import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import CommentContext, { CommentContextProvider } from '../../../../context/commentContext'
import axios from 'axios'

const CommentBox = ({ post_id, setIsPosted, isPosted }) => {
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [commentLoading, setCommentLoading] = useState(false)

    const { commentState, getCurrentUser, verifyUser } = useContext(CommentContext)

    const { currentUser, isLoading, isVerified, error } = commentState

    const navigate = useNavigate()
    const alert = useAlert()



    const submitHandler = e => {
        e.preventDefault()

        if (isVerified) {
            postComment()
        } else {
            verifyUser(email, post_id)
            if (currentUser.user.success && currentUser.user.user.status === 0) {
                navigate(`/verify/${currentUser.user.slug}`)
            }
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

                <Button variant="primary" type="submit" disabled={commentLoading || isLoading ? true : false}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CommentBox
