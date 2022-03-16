import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import UserContext from '../../../context/userContext'

const UpdateUserForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { user, getUser, updateUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')

    const [detailsLoading, setDetailsLoading] = useState(true)

    const { loading, isUpdated, error, message, user: userDetails } = user

    useEffect(() => {
        if (userDetails && userDetails._id !== id) {
            getUser(id)
            setDetailsLoading(false)
        } else if (userDetails) {
            setEmail(userDetails.email)
            setName(userDetails.name)
            setRole(userDetails.role)
            setDetailsLoading(false)
        } else {
            getUser(id)
            setDetailsLoading(false)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/user')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, userDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        updateUser(id, { email, name, role })
    }

    return (
        <>
            {!detailsLoading && <form onSubmit={submitHandler}>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                <select name="role" onChange={e => setRole(e.target.value)} required>
                    <option>-</option>
                    <option value="admin" selected={role === "admin" ? true : false}>admin</option>
                    <option value="superadmin" selected={role === "superadmin" ? true : false}>superadmin</option>
                </select>
                <input type="submit" value="update" disabled={loading ? true : false} />
            </form>}
        </>
    )
}

export default UpdateUserForm
