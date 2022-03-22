import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import DonationContext from '../../../context/donationContext'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'
import Load from '../../layout/Load'

const UpdateDonationForm = ({ title }) => {
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
        detailsLoading ? <Load /> :
            <>
                <Metadata title={title} />
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" value={accountName} placeholder="Enter account name" onChange={e => setAccountName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control type="text" value={accountNumber} placeholder="Enter account number" onChange={e => setAccountNumber(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control type="text" value={bankName} placeholder="Enter bank name" onChange={e => setBankName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Instructions</Form.Label>
                        <Form.Control as="textarea" value={instructions} placeholder="Enter instructions" onChange={e => setInstructions(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Donation link</Form.Label>
                        <Form.Control type="text" value={donationLink} placeholder="Enter donation link" onChange={e => setDonationLink(e.target.value)} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>QR Code</Form.Label>
                        {oldQrCode && <img src={oldQrCode} height="100" />}
                        <Form.Control type="file" name={qrCode} accept="image/*" onChange={onChange} />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading ? true : false} >
                        Submit
                    </Button>
                </Form>
            </>
    )
}

export default UpdateDonationForm
