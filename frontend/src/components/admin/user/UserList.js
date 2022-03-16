import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import UserContext from '../../../context/userContext'

const UserList = () => {
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
            <Metadata title={`Manage Users`} />
            <div>
                <h1>Users</h1>
                <Link to="/admin/user/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {users && users.map(user => (
                                <tr>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <Link to={`/admin/user/${user._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(user._id)} disabled={user.role === 'superadmin' ? true : deleteLoading ? true : false}>Delete</Button>
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

export default UserList
