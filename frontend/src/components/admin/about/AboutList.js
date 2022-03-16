import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import AboutContext from '../../../context/aboutContext'

const AboutList = () => {
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
            <Metadata title={`Manage About Us`} />
            <div>
                <h1>Awards and Recognitions</h1>
                <Link to="/admin/about/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Content</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {abouts && abouts.map(about => (
                                <tr>
                                    <td>{about.content}</td>
                                    <td>
                                        <Link to={`/admin/about/${about._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(about._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default AboutList
