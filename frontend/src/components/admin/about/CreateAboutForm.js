import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import AboutContext from '../../../context/aboutContext'

const CreateAboutForm = () => {
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

        if(error) {
            alert.error(error)
        }
    }, [isCreated, message, error])

    const submitHandler = e => {
        e.preventDefault()

        createAbout({ content })
    }

    return (
        <>
            <form onSubmit={submitHandler}>
                <input type="text" value={content} onChange={e => setContent(e.target.value)} required />
                <input type="submit" value="create" disabled={loading ? true : false} />
            </form>
        </>
    )
}

export default CreateAboutForm
