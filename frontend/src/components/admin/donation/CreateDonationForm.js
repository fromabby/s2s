import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import DonationContext from '../../../context/donationContext'

const CreateDonationForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { donation, createDonation } = useContext(DonationContext)

    const [accountName, setAccountName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [qrCode, setQrCode] = useState([])
    const [bankName, setBankName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [donationLink, setDonationLink] = useState('')

    const { loading, isCreated, error, message } = donation

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/donation')
        }

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('account_name', accountName)
        formData.append('account_number', accountNumber)
        formData.append('bank_name', bankName)
        formData.append('instructions', instructions)
        formData.append('donation_link', donationLink)
        qrCode && qrCode.map(qr => formData.append('qr_code', qr))


        createDonation(formData)
    }

    const onChange = e => {
        e.preventDefault()

        setQrCode(Array.from(e.target.files))
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} style={{ width: '100' }} required />
                <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} style={{ width: '100' }} required />
                <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={{ width: '100' }} required />
                <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} style={{ width: '100' }} required />
                <input type="text" value={donationLink} onChange={e => setDonationLink(e.target.value)} style={{ width: '100' }} required />
                <input type="file" name={qrCode} accept="image/*" onChange={onChange} />
                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateDonationForm
