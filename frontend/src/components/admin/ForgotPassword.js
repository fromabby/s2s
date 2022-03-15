import React, { useState, useContext, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import PasswordContext from '../../context/passwordContext'

const ForgotPassword = () => {
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
        <div>
            forgot password
            <form onSubmit={submitHandler}>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
                <input type='submit' value='submit' disabled={loading ? true : false} />
            </form>
        </div>
    )
}

export default ForgotPassword
