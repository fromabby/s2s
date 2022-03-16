import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RegistrationContext from '../../../context/registrationContext'

const RegistrationList = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [registrations, setRegistrations] = useState([])
    const [loading, setLoading] = useState(true)

    const { registration, deleteRegistration } = useContext(RegistrationContext)
    const { loading: deleteLoading, isDeleted, error } = registration

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/registrations')

                if (data.success) {
                    setRegistrations(data.registrations)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                alert.error(error)
            }
        }
        fetchData()

        if (isDeleted) {
            alert.success('Content has been deleted.')
            navigate('/admin/registration')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteRegistration(id)
        }
    }

    return (
        <div>
            <Metadata title={`Manage Registration Links`} />
            <div>
                <h1>Awards and Recognitions</h1>
                <Link to="/admin/registration/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Link</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {registrations && registrations.map(registration => (
                                <tr>
                                    <td>{registration.link}</td>
                                    <td>{registration.registrationType}</td>
                                    <td>
                                        <Link to={`/admin/registration/${registration._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(registration._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>}
            </div>
        </div>
    )
}

export default RegistrationList
