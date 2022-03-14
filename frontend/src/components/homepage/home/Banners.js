import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Carousel } from 'react-bootstrap'

const Banners = () => {
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get('/api/v1/banners')

                if (data.success) {
                    setBanners(data.banners)
                    setLoading(false)
                }

            } catch (error) {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        loading ?
            <h1>Loading...</h1> :
            <Carousel>
                {
                    banners && banners.map(banner => (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={banner.image[0].path}
                            />
                        </Carousel.Item>
                    ))
                }
            </Carousel>

    )
}


export default Banners
