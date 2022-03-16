import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RecordContext from '../../../context/recordContext'

const CreateRecordForm = () => {
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
            <form onSubmit={submitHandler}>
                <input type="datetime-local" value={recordDate} onChange={e => setRecordDate(e.target.value)} required />
                <input type="text" value={recordName} onChange={e => setRecordName(e.target.value)} required />
                <input type="text" value={recordPlatform} onChange={e => setRecordPlatform(e.target.value)} required />
                <input type="text" value={recordAmount} onChange={e => setRecordAmount(e.target.value)} required />

                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateRecordForm
