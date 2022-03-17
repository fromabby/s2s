import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import UserContext from '../../../context/userContext'

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

    return (
        <div>
            <Metadata title={title} />
            <div>
                {loading ? <h1>Loading...</h1> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Users</h1>
                        <div className='create-button'>
                            <Link to="/admin/user/new">
                                <Button variant={"success"}>Add user</Button>
                            </Link>
                        </div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">ROLE</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users && users.map(user => (
                                    <tr>
                                        <td><div className="td-container">id goes here</div></td>
                                        <td><div className="td-container">{user.email}</div></td>
                                        <td><div className="td-container">{user.role}</div></td>
                                        <td>
                                            <div className="td-container">
                                                <Link to={`/admin/user/${user._id}`}>
                                                    <Button variant={"primary"}>Edit</Button>
                                                </Link>
                                                <Button variant={"danger"} onClick={() => deleteHandler(user._id)} disabled={user.role === 'superadmin' ? true : deleteLoading ? true : false}>Delete</Button>
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

export default UserList
