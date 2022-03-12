import React, { useState, useEffect } from 'react'
import axios from 'axios'

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
                console.log('no response')
            }
        }
        fetchData()
    }, [])

    return (
        <div>
            {loading ?
                <h1>Loading...</h1> :
                banners && banners.map(banner => (
                    <img src={banner.image[0].path} height="100"/>
                ))
            }
        </div>
    )
}

export default Banners
