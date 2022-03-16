import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RecordContext from '../../../context/recordContext'
import formatDate from '../../../formatDate'

const RecordList = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(true)

    const { record, deleteRecord } = useContext(RecordContext)
    const { loading: deleteLoading, isDeleted, error } = record


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/records')
                console.log(data)
                if (data.success) {
                    setRecords(data.records)
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
            navigate('/admin/record')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteRecord(id)
        }
    }

    return (
        <div>
            <Metadata title={`Manage Records`} />
            <div>
                <h1>Records</h1>
                <Link to="/admin/record/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Platform</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {records && records.map(record => (
                                <tr>
                                    <td>{formatDate(record.record_date)}</td>
                                    <td>{record.record_name}</td>
                                    <td>{record.record_platform}</td>
                                    <td>{record.record_amount}</td>
                                    <td>
                                        <Link to={`/admin/record/${record._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(record._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default RecordList
