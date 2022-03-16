import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import DonationContext from '../../../context/donationContext'

const UpdateDonationForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { donation, getDonation, updateDonation } = useContext(DonationContext)

    const [accountName, setAccountName] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [qrCode, setQrCode] = useState([])
    const [bankName, setBankName] = useState('')
    const [instructions, setInstructions] = useState('')
    const [donationLink, setDonationLink] = useState('')
    const [oldQrCode, setOldQrCode] = useState('')

    const { loading, isUpdated, error, message, donation: donationDetails } = donation
    const [detailsLoading, setDetailsLoading] = useState(true)

    useEffect(() => {
        if (donationDetails && donationDetails._id !== id) {
            getDonation(id)
            setDetailsLoading(false)
        } else if (donationDetails) {
            setAccountName(donationDetails.account_details.account_name)
            setAccountNumber(donationDetails.account_details.account_number)
            setOldQrCode(donationDetails.qr_code[0].path)
            setBankName(donationDetails.bank_name)
            setInstructions(donationDetails.instructions)
            setDonationLink(donationDetails.donation_link)
            setDetailsLoading(false)
        } else {
            getDonation(id)
            setDetailsLoading(false)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/donation')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, donationDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('account_name', accountName)
        formData.append('account_number', accountNumber)
        formData.append('bank_name', bankName)
        formData.append('instructions', instructions)
        formData.append('donation_link', donationLink)
        qrCode && qrCode.map(qr => formData.append('qr_code', qr))

        updateDonation(id, formData)
}

const onChange = e => {
    e.preventDefault()

    setOldQrCode([])
    setQrCode(Array.from(e.target.files))
}
return (
    <>
        {!detailsLoading && <form onSubmit={submitHandler}>
            {oldQrCode && <img src={oldQrCode} height="100" />}
            <input type="text" value={accountName} onChange={e => setAccountName(e.target.value)} style={{ width: '100' }} required />
            <input type="text" value={accountNumber} onChange={e => setAccountNumber(e.target.value)} style={{ width: '100' }} required />
            <input type="text" value={bankName} onChange={e => setBankName(e.target.value)} style={{ width: '100' }} required />
            <input type="text" value={instructions} onChange={e => setInstructions(e.target.value)} style={{ width: '100' }} required />
            <input type="text" value={donationLink} onChange={e => setDonationLink(e.target.value)} style={{ width: '100' }} required />

            <input type="file" name={qrCode} accept="image/*" onChange={onChange} />
            <input type="submit" value="update" disabled={loading ? true : false} />
        </form>}
    </>
)
}

export default UpdateDonationForm
