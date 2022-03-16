import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAlert } from 'react-alert'
import AboutContext from '../../../context/aboutContext'

const UpdateAboutForm = () => {
    const navigate = useNavigate()
    const alert = useAlert()
    const { id } = useParams()

    const { about, getAbout, updateAbout } = useContext(AboutContext)

    const [content, setContent] = useState('')

    const { loading, isUpdated, error, message, about: aboutDetails } = about

    useEffect(() => {
        if(aboutDetails && aboutDetails._id !== id) {
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
        <>
            {!loading && <form onSubmit={submitHandler}>
                <input type="text" value={content} onChange={e => setContent(e.target.value)} style={{ width: '100' }} required />
                <input type="submit" value="update" disabled={loading ? true : false} />
            </form>}
        </>
    )
}

export default UpdateAboutForm
