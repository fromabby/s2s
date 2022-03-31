import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import BannerContext from '../../../context/bannerContext'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'
import Load from '../../layout/Load'

const UpdateBannerForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { banner, getBanner, updateBanner } = useContext(BannerContext)

    const [oldImage, setOldImage] = useState([])
    const [image, setImage] = useState([])

    const { loading, isUpdated, error, message, banner: bannerDetails } = banner
    const [detailsLoading, setDetailsLoading] = useState(true)

    useEffect(() => {
        if (bannerDetails && bannerDetails._id !== id) {
            getBanner(id)
            setDetailsLoading(false)
        } else if (bannerDetails) {
            setOldImage(bannerDetails.image[0].path)
            setDetailsLoading(false)
        } else {
            getBanner(id)
            setDetailsLoading(false)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/banner')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, bannerDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        image.map(image => formData.append('image', image))

        updateBanner(id, formData)
    }

    const onChange = e => {
        e.preventDefault()

        setOldImage([])
        setImage(Array.from(e.target.files))
    }
    return (
        detailsLoading ? <Load /> :
            <>
                <Metadata title={title} />
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3" style={{width: '500px'}}>
                        <Form.Label>Banner image</Form.Label>
                        {oldImage && <img src={oldImage} height="100" />}
                        <Form.Control type="file" name={image} accept="image/*" onChange={onChange} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading ? true : false} >
                        Submit
                    </Button>
                </Form>
            </>
    )
}

export default UpdateBannerForm
