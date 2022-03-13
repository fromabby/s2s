import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Metadata from '../../../layout/Metadata'

const OtpBox = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const alert = useAlert()

    const [name, setName] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const submitHandler = e => {
        e.preventDefault()

        fetchData()
    }

    const fetchData = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post(`/api/v1/viewer/create/${slug}`, { full_name: name, otp }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.success) {
                setLoading(false)
                setIsVerified(true)
                console.log(data.user.post_id)
                navigate(`/blog/${data.user.post_id}/?verified=${isVerified}`)
                alert.success('You may now leave a comment!')
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            <Metadata title={`Verify your account`} />
            <form onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Enter OTP</Form.Label>
                    <Form.Control type="text" name="otp" placeholder="xxxxxx" value={otp} onChange={e => setOtp(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Enter your name</Form.Label>
                    <Form.Control type="text" name="name" placeholder="Juan Dela Cruz" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading ? true : false}>
                    Submit
                </Button>
            </form>
        </div>
    )
}

export default OtpBox
