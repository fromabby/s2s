import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RegistrationContext from '../../../context/registrationContext'

const CreateRegistrationForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { registration, createRegistration } = useContext(RegistrationContext)

    const [link, setLink] = useState('')
    const [registrationType, setRegistrationType] = useState('')

    const { loading, isCreated, error, message } = registration

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/registration')
        }

        if(error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createRegistration({ link, registrationType })
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} required />
                <input type="text" value={registrationType} onChange={e => setRegistrationType(e.target.value)} required />
                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateRegistrationForm
