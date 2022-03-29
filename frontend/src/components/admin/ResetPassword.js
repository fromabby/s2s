import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useParams, useNavigate } from 'react-router-dom'
import PasswordContext from '../../context/passwordContext'
import { Button, Form } from 'react-bootstrap'
import Metadata from '../layout/Metadata'

const ResetPassword = ({ title }) => {
    const alert = useAlert()
    const navigate = useNavigate()
    const { token } = useParams()

    const [newPassword, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { password, resetPassword } = useContext(PasswordContext)
    const { loading, success, error } = password

    useEffect(() => {
        if (success) {
            alert.success('Password has been updated.')
            navigate('/login')
        }

        if (error) {
            alert.error(error)
        }
    }, [alert, navigate, success, error])

    const submitHandler = e => {
        e.preventDefault()

        resetPassword(token, { password: newPassword, confirmPassword })
    }

    return (
        <div>
            <Metadata title={title} />
            <Form className="loginForm" onSubmit={submitHandler}>
                <Form.Group className="inputField">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="password" value={newPassword} onChange={e => setPassword(e.target.value)} required />
                </Form.Group>
                <Form.Group className="inputField">
                    <Form.Label>Confirm password</Form.Label>
                    <Form.Control type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </Form.Group>
                <div className='d-flex flex-column container align-items-center my-2'>
                    <button type="submit" className='login-button' disabled={loading ? true : false} >
                        Submit
                    </button>
                </div>
            </Form>
        </div>
    )
}

export default ResetPassword
