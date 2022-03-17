import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RecordContext from '../../../context/recordContext'
import formatDate from '../../../formatDate'

const RecordList = ({ title }) => {
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
            <Metadata title={title} />
            <div>
                {loading ? <h1>Loading...</h1> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Records</h1>
                        <div className='create-button'>
                            <Link to="/admin/record/new">
                                <Button variant={"success"}>Add new record</Button>
                            </Link>
                        </div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th scope="col">DATE</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">PLATFORM</th>
                                    <th scope="col">AMOUNT</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records && records.map(record => (
                                    <tr>
                                        <td><div className="td-container">{formatDate(record.record_date)}</div></td>
                                        <td><div className="td-container">{record.record_name}</div></td>
                                        <td><div className="td-container">{record.record_platform}</div></td>
                                        <td><div className="td-container">{record.record_amount}</div></td>
                                        <td>
                                            <div className="td-container">
                                                <Link to={`/admin/record/${record._id}`}>
                                                    <Button variant={"primary"}>Edit</Button>
                                                </Link>
                                                <Button variant={"danger"} onClick={() => deleteHandler(record._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default RecordList
