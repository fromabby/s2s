import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RecordContext from '../../../context/recordContext'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const CreateRecordForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { record, createRecord } = useContext(RecordContext)

    const [recordName, setRecordName] = useState('')
    const [recordDate, setRecordDate] = useState('')
    const [recordPlatform, setRecordPlatform] = useState('')
    const [recordAmount, setRecordAmount] = useState('')

    const { loading, isCreated, error, message } = record

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/record')
        }

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createRecord({
            record_name: recordName,
            record_date: recordDate,
            record_platform: recordPlatform,
            record_amount: recordAmount
        })
    }

    return (
        <>
            <Metadata title={title} />
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
        </>
    )
}

export default CreateRecordForm
