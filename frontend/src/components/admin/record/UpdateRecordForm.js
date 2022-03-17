import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RecordContext from '../../../context/recordContext'
import dateFormat from "dateformat";
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const UpdateRecordForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { record, getRecord, updateRecord } = useContext(RecordContext)

    const [recordName, setRecordName] = useState('')
    const [recordDate, setRecordDate] = useState('')
    const [recordPlatform, setRecordPlatform] = useState('')
    const [recordAmount, setRecordAmount] = useState('')

    const [detailsLoading, setDetailsLoading] = useState(true)

    const { loading, isUpdated, error, message, record: recordDetails } = record

    const convertDate = date => dateFormat(date, "yyyy-mm-dd")
    const convertTime = date => dateFormat(date, "HH:MM")

    useEffect(() => {
        if (recordDetails && recordDetails._id !== id) {
            getRecord(id)
            setDetailsLoading(false)
        } else if (recordDetails) {
            setRecordName(recordDetails.record_name)
            setRecordDate(`${convertDate(recordDetails.record_date)}T${convertTime(recordDetails.record_date)}`)
            setRecordPlatform(recordDetails.record_platform)
            setRecordAmount(recordDetails.record_amount)
            setDetailsLoading(false)
        } else {
            getRecord(id)
            setDetailsLoading(false)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/record')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, recordDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        updateRecord(id, {
            record_name: recordName,
            record_date: recordDate,
            record_platform: recordPlatform,
            record_amount: recordAmount
        })
    }

    return (
        <>
            <Metadata title={title} />
            {!detailsLoading &&
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Record Date</Form.Label>
                        <Form.Control type="datetime-local" value={recordDate} placeholder="Enter record date" onChange={e => setRecordDate(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Record Name</Form.Label>
                        <Form.Control type="text" value={recordName} placeholder="Enter record name" onChange={e => setRecordName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Record Platform</Form.Label>
                        <Form.Control type="text" value={recordPlatform} placeholder="Enter record platform" onChange={e => setRecordPlatform(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Record Amount</Form.Label>
                        <Form.Control type="text" value={recordAmount} placeholder="Enter record amount" onChange={e => setRecordAmount(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading ? true : false} >
                        Submit
                    </Button>
                </Form>
            }
        </>
    )
}

export default UpdateRecordForm
