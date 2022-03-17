import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import DonationContext from '../../../context/donationContext'

const DonationList = ({ title }) => {
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
            <Metadata title={title} />
            <div>
                {loading ? <h1>Loading...</h1> : <>
                    <div className='manage-post-div'>
                        <h1>Manage Donation Links</h1>
                        <div className='create-button'>
                            <Link to="/admin/donation/new">
                                <Button variant={"success"}>Add new donation</Button>
                            </Link>
                        </div>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th scope="col">BANK NAME</th>
                                    <th scope="col">ACCOUNT NAME</th>
                                    <th scope="col">INSTRUCTIONS</th>
                                    <th scope="col">QR CODE</th>
                                    <th scope="col">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donations && donations.map(donation => (
                                    <tr>
                                        <td><div className="td-container">{donation.bank_name}</div></td>
                                        <td><div className="td-container">{donation.account_details.account_name}</div></td>
                                        <td><div className="td-container">{donation.instructions}</div></td>
                                        <td>
                                            <div className="td-container">
                                                <div className='image-wrapper'>
                                                    <img className='image' src={donation.qr_code[0].path} />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="td-container">
                                                <Link to={`/admin/donation/${donation._id}`}>
                                                    <Button variant={"primary"}>Edit</Button>
                                                </Link>
                                                <Button variant={"danger"} onClick={() => deleteHandler(donation._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default DonationList
