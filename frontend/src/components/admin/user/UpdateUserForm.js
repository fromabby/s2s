import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import UserContext from '../../../context/userContext'
import { Button, Form } from 'react-bootstrap'
import Metadata from '../../layout/Metadata'

const UpdateUserForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { user, getUser, updateUser } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [role, setRole] = useState('')

    const [detailsLoading, setDetailsLoading] = useState(true)

    const { loading, isUpdated, error, message, user: userDetails } = user

    useEffect(() => {
        if (userDetails && userDetails._id !== id) {
            getUser(id)
            setDetailsLoading(false)
            console.log(userDetails)
        } else if (userDetails) {
            setEmail(userDetails.email)
            setFirstName(userDetails.name.first_name)
            setLastName(userDetails.name.last_name)
            setRole(userDetails.role)
            setDetailsLoading(false)
            console.log(userDetails)
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

        updateUser(id, { email, name: { first_name: firstName, last_name: lastName }, role })
    }

    return (
        <>
            <Metadata title={title} />
            {!detailsLoading &&
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" onChange={e => setRole(e.target.value)} required>
                            <option>-</option>
                            <option value="admin" selected={role == "admin"}>admin</option>
                            <option value="contributor" selected={role == "contributor"}>contributor</option>
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

export default UpdateUserForm
