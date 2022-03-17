import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RegistrationContext from '../../../context/registrationContext'

const RegistrationList = ({ title }) => {
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
            <Metadata title={title} />
            <div>
                {loading ? <h1>Loading...</h1> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Registration Links</h1>
                        <div className="create-button">
                            <Link to="/admin/registration/new">
                                <Button variant={"success"}>Add registration link</Button>
                            </Link>
                        </div>

                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">LINK</th>
                                    <th scope="col">TYPE</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations && registrations.map(registration => (
                                    <tr>
                                        <td><div className="td-container">id goes here</div></td>
                                        <td><div className="td-container">{registration.link}</div></td>
                                        <td><div className="td-container">{registration.registrationType}: {registration.registrationType === 1 ? "Partner" : "Volunteer"}</div></td>
                                        <td><div className="td-container">
                                            <Link to={`/admin/registration/${registration._id}`}>
                                                <Button variant={"primary"}>Edit</Button>
                                            </Link>
                                            <Button variant={"danger"} onClick={() => deleteHandler(registration._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                                        </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </>}
            </div>
        </div>
    )
}

export default RegistrationList
