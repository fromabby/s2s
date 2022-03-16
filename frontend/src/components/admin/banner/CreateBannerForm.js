import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import BannerContext from '../../../context/bannerContext'

const CreateBannerForm = () => {
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

        if(error) {
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
            <form onSubmit={submitHandler}>
                <input type="file" name={image} accept="image/*" onChange={e => setImage(Array.from(e.target.files))} required/>
                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateBannerForm
