import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import AboutContext from '../../../context/aboutContext'
import Metadata from '../../layout/Metadata'

const CreateAboutForm = ({ title }) => {
    const navigate = useNavigate()
    const alert = useAlert()

    const { about, createAbout } = useContext(AboutContext)

    const [content, setContent] = useState('')

    const { loading, isCreated, error, message } = about

    useEffect(() => {
        if (isCreated) {
            alert.success(message)
            navigate('/admin/about')
        }

        if (error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createAbout({ content })
    }

    return (
        <>
            <Metadata title={title} />
            <Form className="container mt-2" onSubmit={submitHandler}>
                <Form.Group className="mb-3" style={{width: '800px'}}>
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

export default CreateAboutForm
