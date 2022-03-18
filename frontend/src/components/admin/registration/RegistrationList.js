import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RegistrationContext from '../../../context/registrationContext'
import { MDBDataTableV5 } from 'mdbreact'

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

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 200,
                },
                {
                    label: 'Link',
                    field: 'link',
                    width: 200,
                },
                {
                    label: 'Type',
                    field: 'type',
                    width: 200,
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200,
                }
            ],
            rows: []
        }

        registrations && registrations.forEach(registration => {
            data.rows.push({
                id: "id goes here",
                link: registration.link,
                type: `${registration.registrationType}: ${registration.registrationType === 1 ? `Partner` : `Volunteer`}`,
                actions: <div className="td-container">
                    <Link to={`/admin/registration/${registration._id}`}>
                        <Button variant={"primary"}>Edit</Button>
                    </Link>
                    <Button variant={"danger"} onClick={() => deleteHandler(registration._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                </div>
            })
        })

        return data
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
                        <MDBDataTableV5
                            hover
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={setData()}
                            fullPagination
                        />
                    </div>
                </>}
            </div>
        </div>
    )
}

export default RegistrationList
