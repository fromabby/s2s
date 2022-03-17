import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RegistrationContext from '../../../context/registrationContext'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const CreateRegistrationForm = ({ title }) => {
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

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createRegistration({ link, registrationType })
    }

    return (
        <>
            <Metadata title={title} />
            <Form className="container mt-2" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Registration Link</Form.Label>
                    <Form.Control type="text" value={link} placeholder="Enter registration link" onChange={e => setLink(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Registration Type</Form.Label>
                    <Form.Select name="registrationType" placeholder="Enter registration type" onChange={e => setRegistrationType(e.target.value)} required>
                        <option>-</option>
                        <option value="1">Partner</option>
                        <option value="2">Volunteer</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading ? true : false} >
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateRegistrationForm
