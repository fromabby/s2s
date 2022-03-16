import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import BannerContext from '../../../context/bannerContext'

const BannerList = () => {
    const navigate = useNavigate()
    const alert = useAlert()

    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)

    const { banner, deleteBanner } = useContext(BannerContext)
    const { loading: deleteLoading, isDeleted, error } = banner

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('/api/v1/banners')

                if (data.success) {
                    setBanners(data.banners)
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
            navigate('/admin/banner')
        }
        if (error) {
            alert.error(error)
        }
    }, [isDeleted, error])

    const deleteHandler = id => {
        if (window.confirm('Are you sure you want to delete this?')) {
            deleteBanner(id)
        }
    }

    return (
        <div>
            <Metadata title={`Manage Banners`} />
            <div>
                <h1>Banners</h1>
                <Link to="/admin/banner/new">
                    <Button variant={"primary"}>Create</Button>
                </Link>

                {loading ? <h1>Loading...</h1> : <>
                    <table>
                        <thead>
                            <th>Content</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {banners && banners.map(banner => (
                                <tr>
                                    <td>
                                        <img src={banner.image[0].path} height="100"/>
                                    </td>
                                    <td>
                                        <Link to={`/admin/banner/${banner._id}`}>
                                            <Button variant={"primary"}>Edit</Button>
                                        </Link>
                                        <Button variant={"danger"} onClick={() => deleteHandler(banner._id)} disabled={deleteLoading ? true : false}>Delete</Button>
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

export default BannerList
