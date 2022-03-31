import React, { useState, useEffect } from "react";
import axios from 'axios'
import "./css/Partners.css";
import Metadata from '../layout/Metadata'
import Load from "../layout/Load";

const Partners = ({ title }) => {
    const [partners, setPartners] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/v1/registrations')

                if (data.success) {
                    setPartners(data.registrations)
                    setLoading(false)
                }

            } catch (error) {
                setLoading(false)
                setPartners([])
            }
        }
        fetchData()
    }, [])
    return (
        loading ? <Load /> :
            <div className="bg_image content-container">
                <Metadata title={title} />
                <div className="container-register">
                    <div id="register">
                        <h1 style={{ fontSize: "3.5vw" }} className="text-center">
                            Be one of us!
                        </h1>
                        <div className="flex-container-partner">

                            {partners && partners.length > 0 && partners.map(partner => (
                                <div className="partner">
                                    <a href={partner.link} target="_blank">
                                        <img src={partner.registrationType === 1 ? "/images/PART.png" : "/images/VOL.png"} alt={partner.registrationType === 1 ? "Partnership" : "Volunteer"} style={{ width: "100%" }} />
                                    </a>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                </div>

            </div>
    );
}


export default Partners