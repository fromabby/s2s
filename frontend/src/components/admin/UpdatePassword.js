import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'

const UpdatePassword = () => {
    const alert = useAlert()
    const navigate = useNavigate()

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const { auth, updatePassword } = useContext(AuthContext)
    const { loading, isUpdated, error } = auth

    useEffect(() => {
        if (isUpdated) {
            alert.success('Password has been updated.')
            navigate('/me')
        }

        if (error) {
            alert.error(error)
        }
    }, [alert, navigate, isUpdated, error])

    const submitHandler = e => {
        e.preventDefault()

        updatePassword({ oldPassword, password, confirmPassword })
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                    <input type="text" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                    <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
                    <input type="text" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    <input type="submit" value="submit" disabled={loading? true:false}/>
                </form>
        </div>
    )
}

export default UpdatePassword
