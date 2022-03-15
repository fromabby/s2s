import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useParams, useNavigate } from 'react-router-dom'
import PasswordContext from '../../context/passwordContext'

const ResetPassword = () => {
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
            <form onSubmit={submitHandler}>
                <input type="password" value={newPassword} onChange={e => setPassword(e.target.value)} />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                <input type="submit" value="submit" disabled={loading ? true : false} />
            </form>
        </div>
    )
}

export default ResetPassword
