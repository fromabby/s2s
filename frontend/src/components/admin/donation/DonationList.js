import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import DonationContext from '../../../context/donationContext'

const DonationList = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [donations, setDonations] = useState([])
    const [loading, setLoading] = useState(true)

    const { donation, deleteDonation } = useContext(DonationContext)
    const { loading: deleteLoading, isDeleted, error } = donation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/donations')

                if (data.success) {
                    setDonations(data.donations)
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
            navigate('/admin/donation')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteDonation(id)
        }
    }

    return (
        <div>
            <Metadata title={`Manage Donations`} />
            <div>
                <h1>Donations</h1>
                <Link to="/admin/donation/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Bank Name</th>
                            <th>Account Name</th>
                            <th>Instructions</th>
                            <th>QR Code</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {donations && donations.map(donation => (
                                <tr>
                                    <td>{donation.bank_name}</td>
                                    <td>{donation.account_details.account_name}</td>
                                    <td>{donation.instructions}</td>
                                    <td><img src={donation.qr_code[0].path} height="100"/></td>
                                    <td>
                                        <Link to={`/admin/donation/${donation._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(donation._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default DonationList
