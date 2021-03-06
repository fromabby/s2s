import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import UserContext from '../../../context/userContext'
import Load from '../../layout/Load'
import { MDBDataTableV5 } from 'mdbreact'
import './../mdbtable.css'

const UserList = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const { user, deleteUser } = useContext(UserContext)
    const { loading: deleteLoading, isDeleted, error } = user


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/admin/users')
                if (data.success) {
                    setUsers(data.users)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                alert.error(error)
            }
        }
        fetchData()
    }, [])


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/admin/users')

                if (data.success) {
                    setUsers(data.users)
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
            navigate('/admin/user')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteUser(id)
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
                    label: 'Email',
                    field: 'email',
                    width: 200,
                },
                {
                    label: 'Role',
                    field: 'role',
                    width: 200,
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200,
                },

            ],
            rows: []
        }

        users && users?.forEach((user, index) => {
            data.rows.push({
                id: (index + 1),
                email: user.email,
                role: user.role,
                actions: <div className="td-container">
                    <Link to={`/admin/user/${user._id}`}>
                        <Button variant={"primary"} className="admin-button primary">Edit</Button>
                    </Link>
                    <Button variant={"danger"} className="admin-button danger" onClick={() => deleteHandler(user._id)} disabled={user.role === 'admin' ? true : deleteLoading ? true : false}>Delete</Button>
                </div>
            })
        })

        return data
    }
    return (
        <div>
            <Metadata title={title} />
            <div>
                {loading ? <Load /> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Users</h1>
                        <div className='create-button'>
                            <Link to="/admin/user/new">
                                <Button variant={"success"} className="success">Add user</Button>
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
                </>}
            </div>
        </div>
    )
}

export default UserList
