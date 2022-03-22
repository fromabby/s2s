import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'
import { useAlert } from 'react-alert'
import Metadata from '../../layout/Metadata'
import AboutContext from '../../../context/aboutContext'
import Load from '../../layout/Load'

const UpdateAboutForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { about, getAbout, updateAbout } = useContext(AboutContext)

    const [content, setContent] = useState('')

    const { loading, isUpdated, error, message, about: aboutDetails } = about

    useEffect(() => {
        if (aboutDetails && aboutDetails._id !== id) {
            getAbout(id)
        } else if (aboutDetails) {
            setContent(aboutDetails.content)
        } else {
            getAbout(id)
        }

        if (isUpdated) {
            alert.success(message)
            navigate('/admin/about')
        }

        if (error) {
            alert.error(error)
        }
    }, [isUpdated, message, error, aboutDetails, id])

    const submitHandler = e => {
        e.preventDefault()

        updateAbout(id, { content })
    }

    return (
        loading ? <Load /> :
            <>
                <Metadata title={title} />
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control type="text" name="title" placeholder="Enter content" value={content} onChange={e => setContent(e.target.value)} required />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={loading ? true : false} >
                        Submit
                    </Button>
                </Form>
            </>

    )
}

export default UpdateAboutForm
