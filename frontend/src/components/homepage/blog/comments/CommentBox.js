import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap';
import { useAlert } from 'react-alert'
import CommentContext from '../../../../context/commentContext'

const CommentBox = ({ post_id }) => {
    const [comment, setComment] = useState('')
    const [email, setEmail] = useState('')
    const [verified, setVerified] = useState(false)

    const { commentState, verifyUser, addComment, dispatchUser } = useContext(CommentContext)

    const { currentUser, isLoading, isSlug, slug, isVerified, error } = commentState

    const navigate = useNavigate()
    const alert = useAlert()

    useEffect(() => {
        dispatchUser({type: "RESET_SLUG"})
    }, [])

    useEffect(() => {
        if (isSlug) {
            if (currentUser.user.status === 0) {
                navigate(`/verify/${slug}`)
                alert.success('An OTP has been sent to your email.')
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
            {verified || isVerified ?
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" style={{ width: '800px' }}>
                        <Form.Label>Leave a comment</Form.Label>
                        <textarea class="form-control" rows="3" name="comment" placeholder="Leave a comment..." value={comment} onChange={e => setComment(e.target.value)}></textarea>
                    </Form.Group>
                    <Button type="submit" className="admin-button primary" disabled={isLoading}>
                        Submit
                        </Button>
                </Form>
                :
                <>
                    <Form className="loginForm" onSubmit={submitHandler}>
                        <img src='/images/logo.png' className='loginLogo' />
                        <Form.Group className="inputField">
                            <Form.Control type="email" name="email" placeholder="Enter your email..." value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <button className='login-button primary' type="submit" disabled={isLoading ? true : false} >
                            Submit
                        </button>
                    </Form>
                </>
            }
        </div>
    )
}

export default CommentBox
