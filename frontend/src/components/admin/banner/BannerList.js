import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Metadata from '../../layout/Metadata'
import BannerContext from '../../../context/bannerContext'
import { MDBDataTableV5 } from 'mdbreact'
import Load from '../../layout/Load'

const BannerList = ({ title }) => {
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

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 800,
                },
                {
                    label: 'Image',
                    field: 'image',
                    width: 800,
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200,
                },

            ],
            rows: []
        }

        banners && banners.forEach((banner, index) => {
            data.rows.push({
                id: index + 1,
                image: <img className='image' src={banner.image[0].path} />,
                actions: <div>
                    <Link to={`/admin/banner/${banner._id}`}>
                        <Button variant={"primary"} className="admin-button primary">Edit</Button>
                    </Link>
                    <Button variant={"danger"} className="admin-button danger" onClick={() => deleteHandler(banner._id)} disabled={deleteLoading ? true : false}>Delete</Button>
                </div>
            })
        })

        return data
    }

    return (
        loading ? <Load /> :
            <div>
                <Metadata title={title} />
                <div>
                    <div className='manage-post-div'>
                        <h1>Manage Banners</h1>
                        <div className='create-button'>
                            <Link to="/admin/banner/new">
                                <Button variant={"success"} className="success">Add new banner</Button>
                            </Link>
                        </div>
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
                </div>
            </div >
    )
}

export default BannerList
