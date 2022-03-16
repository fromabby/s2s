import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import RecordContext from '../../../context/recordContext'
import dateFormat from "dateformat";

const UpdateRecordForm = () => {
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
    const convertTime = date => dateFormat(date, "HH:MM" )

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
            {!detailsLoading && <form onSubmit={submitHandler}>
                <input type="datetime-local" value={recordDate} onChange={e => setRecordDate(e.target.value)} required />
                <input type="text" value={recordName} onChange={e => setRecordName(e.target.value)} required />
                <input type="text" value={recordPlatform} onChange={e => setRecordPlatform(e.target.value)} required />
                <input type="text" value={recordAmount} onChange={e => setRecordAmount(e.target.value)} required />

                <input type="submit" value="update" disabled={loading ? true : false} />
            </form>}
        </>
    )
}

export default UpdateRecordForm
