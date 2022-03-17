import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import Metadata from '../../layout/Metadata'
import { Button, Form } from 'react-bootstrap'
import BannerContext from '../../../context/bannerContext'

const CreateBannerForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { banner, createBanner } = useContext(BannerContext)

    const [image, setImage] = useState([])

    const { loading, isCreated, error, message } = banner

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/banner')
        }

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        image.map(image => formData.append('image', image))
        createBanner(formData)
    }

    return (
        <>
            <Metadata title={title} />
            <Form className="container mt-2" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Banner image</Form.Label>
                    <Form.Control type="file" name={image} accept="image/*" onChange={e => setImage(Array.from(e.target.files))} required  />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading ? true : false} >
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default CreateBannerForm
