import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import AboutContext from '../../../context/aboutContext'
import { MDBDataTableV5 } from 'mdbreact'
import Load from '../../layout/Load'

const AboutList = ({ title }) => {
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

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 200,
                },
                {
                    label: 'Content',
                    field: 'content',
                    width: 800,
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200,
                },

            ],
            rows: []
        }

        abouts && abouts.forEach((about, index) => {
            data.rows.push({
                id: index + 1,
                content: <div className="td-container">{about.content}</div>,
                actions: <div className="td-container">
                    <Link to={`/admin/about/${about._id}`}>
                        <Button variant={"primary"} className="admin-button primary">Edit</Button>
                    </Link>
                    <Button variant={"danger"} className="admin-button danger" onClick={() => deleteHandler(about._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                </div>
            })
        })

        return data
    }

    return (
        loading ? <Load /> :
            <div>
                <Metadata title={title} />
                <div>
                    <div className='manage-post-div'>
                        <h1>Manage Awards and Recognitions</h1>
                        <div className='create-button'>
                            <Link to="/admin/about/new">
                                <Button variant={"success"} className="success">Add new about</Button>
                            </Link>
                        </div>
                        <MDBDataTableV5
                            hover
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={setData()}
                            fullPagination
                            searchTop
                            searchBottom={false}
                        />
                    </div>
                </div>
            </div>
    )
}

export default AboutList
