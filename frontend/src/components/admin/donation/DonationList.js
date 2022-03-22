import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import DonationContext from '../../../context/donationContext'
import { MDBDataTableV5 } from 'mdbreact'

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

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 200,
                },
                {
                    label: 'Bank Name',
                    field: 'bank',
                    width: 200,
                },
                {
                    label: 'Account Name',
                    field: 'name',
                    width: 200,
                },
                {
                    label: 'Instructions',
                    field: 'instructions',
                    width: 200,
                },
                {
                    label: 'QR Code',
                    field: 'qr',
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
        
        donations && donations.forEach((donation, index) => {
            data.rows.push({
                id: index+1,
                bank: donation.bank_name,
                name: donation.account_details.account_name,
                instructions: donation.instructions,
                qr: <div className="td-container">
                    <div className='image-wrapper'>
                        <img className='image' src={donation.qr_code[0].path} />
                    </div>
                </div>,
                actions: <div className="td-container">
                    <Link to={`/admin/donation/${donation._id}`}>
                        <Button variant={"primary"} className="admin-button primary">Edit</Button>
                    </Link>
                    <Button variant={"danger"} className="admin-button danger" onClick={() => deleteHandler(donation._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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
                        <h1>Manage Donation Links</h1>
                        {
                         donations.length < 2 &&
                         <div className='create-button'>
                            <Link to="/admin/donation/new">
                                <Button variant={"success"} className="success">Add new donation</Button>
                            </Link>
                        </div>
                        }

                        <MDBDataTableV5
                            hover
                            entriesOptions={[5, 20, 25]}
                            entries={5}
                            pagesAmount={4}
                            data={setData()}
                            fullPagination
                            searchTop
                            searchBottom={false}
                        />
                    </div>
                </>}
            </div>
        </div>
    )
}

export default DonationList
