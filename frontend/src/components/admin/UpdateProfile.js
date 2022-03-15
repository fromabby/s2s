import React, { useContext, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/authContext'

const UpdateProfile = () => {
    const alert = useAlert()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const { auth, updateProfile, loadUser } = useContext(AuthContext)
    const { loading, isUpdated, loadError, user, error } = auth

    useEffect(() => {
        if (!loading) {
            if (loadError) {
                navigate('/')
                alert.error(loadError)
            }

            if (isUpdated) {
                alert.success('Profile has been updated.')
                loadUser()
                navigate('/me')
            }

            if (error) {
                alert.error('Profile cannot be updated.')
                navigate('/me')
            }

            setEmail(user.email)
            setName(user.name)
        }
    }, [alert, loadError, user, navigate, isUpdated, error])

    const submitHandler = e => {
        e.preventDefault()

        updateProfile({ name })
    }

    return (
        <div>
            { loading ? <h1>Loading...</h1> :
                <form onSubmit={submitHandler}>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} disabled />
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    <input type="submit" value="submit" />
                </form>
            }
        </div>
    )
}

export default UpdateProfile
