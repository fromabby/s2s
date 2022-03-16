import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RegistrationContext from '../../../context/registrationContext'

const UpdateRegistrationForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { registration, getRegistration, updateRegistration } = useContext(RegistrationContext)

    const [link, setLink] = useState('')
    const [registrationType, setRegistrationType] = useState('')
    const [detailsLoading, setDetailsLoading] = useState(true)

    const { loading, isUpdated, error, message, registration: registrationDetails } = registration

    useEffect(() => {
        if (registrationDetails && registrationDetails._id !== id) {
            getRegistration(id)
            setDetailsLoading(false)
        } else if (registrationDetails) {
            setLink(registrationDetails.link)
            setRegistrationType(registrationDetails.registrationType)
            setDetailsLoading(false)
        } else {
            getRegistration(id)
            setDetailsLoading(false)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/registration')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, registrationDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        updateRegistration(id, { link, registrationType })
    }

    return (
        <>
            {!detailsLoading && <form onSubmit={submitHandler}>
                <input type="text" value={link} onChange={e => setLink(e.target.value)} required />
                <input type="text" value={registrationType} onChange={e => setRegistrationType(e.target.value)} required />
                <input type="submit" value="update" disabled={loading ? true : false} />
            </form>}
        </>
    )
}

export default UpdateRegistrationForm
