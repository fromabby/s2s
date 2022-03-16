import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import UserContext from '../../../context/userContext'

const CreateUserForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { user, createUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')

    const { loading, isCreated, error, message } = user

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/user')
        }

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createUser({ email, name, password, confirmPassword, role })
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <select name="role" onChange={e => setRole(e.target.value)} required>
                    <option>-</option>
                    <option value="admin">admin</option>
                    <option value="superadmin">superadmin</option>
                </select>
                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateUserForm
