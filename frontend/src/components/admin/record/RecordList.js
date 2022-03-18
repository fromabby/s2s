import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import RecordContext from '../../../context/recordContext'
import formatDate from '../../../formatDate'
import { MDBDataTableV5 } from 'mdbreact'

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

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 200,
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 200,
                },
                {
                    label: 'Platform',
                    field: 'platform',
                    width: 200,
                },
                {
                    label: 'Amount',
                    field: 'amount',
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

        records && records.forEach(record => {
            data.rows.push({
                date: formatDate(record.record_date),
                name: record.record_name,
                platform: record.record_platform,
                amount: record.record_amount,
                actions: <div className="td-container">
                    <Link to={`/admin/record/${record._id}`}>
                        <Button variant={"primary"}>Edit</Button>
                    </Link>
                    <Button variant={"danger"} onClick={() => deleteHandler(record._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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
                        <h1>Manage Records</h1>
                        <div className='create-button'>
                            <Link to="/admin/record/new">
                                <Button variant={"success"}>Add new record</Button>
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

export default RecordList
