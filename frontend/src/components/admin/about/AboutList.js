import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import AboutContext from '../../../context/aboutContext'

const AboutList = ({title}) => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [abouts, setAbouts] = useState([])
    const [loading, setLoading] = useState(true)

    const { about, deleteAbout } = useContext(AboutContext)
    const { loading: deleteLoading, isDeleted, error } = about

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/abouts')

                if (data.success) {
                    setAbouts(data.abouts)
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
            navigate('/admin/about')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteAbout(id)
        }
    }

    return (
        <div>
            <Metadata title={title} />
            <div>
                {loading ? <h1>Loading...</h1> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Awards and Recognitions</h1>
                        <div className='create-button'>
                            <Link to="/admin/about/new">
                                <Button variant={"success"}>Add new about</Button>
                            </Link>
                        </div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th scope="col">CONTENT</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {abouts && abouts.map(about => (
                                    <tr>
                                        <td><div className="td-container">{about.content}</div></td>
                                        <td>
                                            <div className="td-container">
                                                <Link to={`/admin/about/${about._id}`}>
                                                    <Button variant={"primary"}>Edit</Button>
                                                </Link>
                                                <Button variant={"danger"} onClick={() => deleteHandler(about._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                                            </div>
                                        </td>
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

export default AboutList
