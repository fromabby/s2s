import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'
import Metadata from '../layout/Metadata'

const UpdatePassword = ({ title }) => {
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
            navigate('/admin/me')
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
            <Metadata title={title}/>
            <form onSubmit={submitHandler}>
                    <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} placeholder="Enter old password" required />
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter new password" required/>
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm new password" required/>
                    <input type="submit" value="submit" disabled={loading? true:false}/>
                </form>
        </div>
    )
}

export default UpdatePassword
