import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import CommentContext from '../../../../context/commentContext'

const CommentBox = ({ post_id }) => {
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [verified, setVerified] = useState(false)

    const { commentState, verifyUser, addComment } = useContext(CommentContext)

    const { currentUser, isLoading, isSlug, slug, isVerified, error } = commentState

    const navigate = useNavigate()
    const alert = useAlert()

    useEffect(() => {
        if (isSlug) {
            console.log(`/verify/${slug}`)
            if (currentUser.user.status === 0) {
                navigate(`/verify/${slug}`)
            } else {
                setVerified(true)
            }
        }
    }, [isSlug, error])

    const submitHandler = e => {
        e.preventDefault()

        if (isVerified || verified) {
            postComment()
        } else {
            verifyUser(email, post_id)
        }
    }

    const postComment = async () => {
        try {
            addComment(comment, post_id)
            setComment('')
            alert.success(`Comment has been posted. Subject for approval`)
        } catch (error) {
            alert.error('cannot post comment')
        }
    }


    return (
        <div className="content-leave-header">
            <form onSubmit={submitHandler}>
                {verified || isVerified ?
                    <Form.Group className="mb-3" style={{ width: '800px' }}>
                        <Form.Label>Leave a comment</Form.Label>
                        <textarea class="form-control" rows="3" name="comment" placeholder="Leave a comment..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    </Form.Group>
                    :
                    <Form.Group className="mb-3" style={{ width: '500px' }}>
                        <Form.Label>Enter your email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                }

                <Button type="submit" className="admin-button primary" disabled={isLoading}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default CommentBox
