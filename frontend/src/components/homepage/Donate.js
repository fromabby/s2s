import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './css/Donate.css'
import Metadata from '../layout/Metadata'

const Donate = ({ title }) => {
    const [donationDetails, setDonationDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/v1/donations')

                if (data.success) {
                    setDonationDetails(data.donations)
                    setLoading(false)
                }

            } catch (error) {
                setLoading(false)
                setDonationDetails([])
            }
        }
        fetchData()
    }, [])

    const ids = ['gcashModal', 'bpiModal']

    return (
        <div
            class="bg_image content-container"
            style={{
                backgroundImage: `url(/images/bg.png)`,
                backgroundSize: "cover"
            }}>
            <Metadata title={title} />


            <div id="donate">
                <h1 style={{ fontSize: '3.5vw' }} className="text-center">Donation Platforms</h1>
                <div className="flex-container">
                    <div data-bs-toggle="modal" data-bs-target="#gcashModal" className='donate'>
                        <img src="./images/gcash.png" alt="Gcash" className="zoom" />
                    </div>
                    <div data-bs-toggle="modal" data-bs-target="#bpiModal" className='donate'>
                        <img src="/images/bpi.png" alt="BPI" className="zoom" />
                    </div>
                </div>
                {/*GCASH Modal */}
                {!loading ? donationDetails.length > 0 ? donationDetails.map((donation, index) => (
                    <div className="modal fade" id={`${ids[index]}`} aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-fullscreen-md-down">
                            <div className="modal-content container-fluid">
                                <div className="modal-header">
                                    <h3 className="text-center">How to Donate ({donation.bank_name})</h3>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                </div>
                                <div className="modal-body d-lg-flex flex-row">
                                    <div className="d-flex align-items-center justify-content-center mr-lg-2">
                                        <img src={donation.qr_code[0].path} className="img-fluid" />
                                    </div>
                                    <div className="p-lg-2 mx-lg-3">
                                        <p>{donation.instructions}</p>
                                        <p>{donation.account_details.account_name}</p>
                                        <p>{donation.account_details.account_number}</p>
                                        <a href={donation.donation_link} target="_blank">{donation.donation_link}</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : <p>Loading...</p> : <p>walang laman</p>}
            </div>
        </div>
    )
}

export default Donate