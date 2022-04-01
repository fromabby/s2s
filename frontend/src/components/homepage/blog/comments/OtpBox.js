import React, { useState, useContext, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import Metadata from '../../../layout/Metadata'
import CommentContext from '../../../../context/commentContext'

const OtpBox = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const alert = useAlert()

    const [name, setName] = useState('')
    const [otp, setOtp] = useState('')

    const { commentState, dispatchUser, createUser } = useContext(CommentContext)

    const { currentUser, isLoading, isVerified, createError } = commentState

    useEffect(() => {
        if (createError) {
            alert.error(createError)
            dispatchUser({ type: "CLEAR_ERRORS" })
        }

        if (currentUser?.success) {
            navigate(`/blog/${currentUser.user.post_id}`)
            alert.success('You may now leave a comment!')
        }
    }, [currentUser, isVerified, createError])

    const submitHandler = e => {
        e.preventDefault()

        createUser({ name, otp }, slug)
    }

    return (
        <div>
            <Metadata title={`Verify your account`} />
            <Form className="container mt-2" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control type="text" name="otp" placeholder="xxxxxx" value={otp} onChange={e => setOtp(e.target.value)} required/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Juan Dela Cruz" value={name} onChange={e => setName(e.target.value)} required/>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={isLoading ? true : false}>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default OtpBox
