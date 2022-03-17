import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RegistrationContext from '../../../context/registrationContext'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const UpdateRegistrationForm = ({ title }) => {
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
            <Metadata title={title} />
            {!detailsLoading &&
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Registration Link</Form.Label>
                        <Form.Control type="text" value={link} placeholder="Enter registration link" onChange={e => setLink(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Registration Type</Form.Label>
                        <Form.Select name="registrationType" placeholder="Enter registration type" onChange={e => setRegistrationType(e.target.value)} required>
                            <option>-</option>
                            <option value="1" selected={registrationType == 1 ? true : false}>Partner</option>
                            <option value="2" selected={registrationType == 2 ? true : false}>Volunteer</option>
                        </Form.Select>
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading ? true : false} >
                        Submit
                    </Button>
                </Form>
            }
        </>
    )
}

export default UpdateRegistrationForm
