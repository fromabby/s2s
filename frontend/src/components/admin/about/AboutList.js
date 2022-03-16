import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'

const AboutList = () => {
    const [abouts, setAbouts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

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
                setError(error)
            }
        }
        fetchData()
    }, [])
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
                                        <Button variant={"danger"}>Delete</Button>
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
