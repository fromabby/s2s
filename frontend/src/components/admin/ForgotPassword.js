import React, { useState, useContext, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import PasswordContext from '../../context/passwordContext'
import Metadata from '../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const ForgotPassword = ({ title }) => {
    const alert = useAlert()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    const { password, forgotPassword } = useContext(PasswordContext)
    const { loading, message, error } = password

    useEffect(() => {
        if (message) {
            alert.success(message)
            navigate('/')
        }

        if (error) {
            alert.error(error)
        }
    }, [message, alert, navigate, error])

    const submitHandler = e => {
        e.preventDefault()

        forgotPassword({ email })
    }
    return (
        <div className='loginDiv'>
            <Metadata title={title} />
            <Form className="loginForm" onSubmit={submitHandler}>
                <img src='/images/logo.png' className='loginLogo' />
                <Form.Group className="inputField">
                    <Form.Control type="text" value={email} placeholder="Enter email address" onChange={e => setEmail(e.target.value)} required />
                </Form.Group>
                <button className='login-button' type="submit" disabled={loading ? true : false} >
                    Submit
                </button>
            </Form>
        </div>
    )
}

export default ForgotPassword
