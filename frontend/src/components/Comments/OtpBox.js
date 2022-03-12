import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const OtpBox = () => {
    const { slug } = useParams()
    const navigate = useNavigate()
    const alert = useAlert()

    const [name, setName] = useState('')
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const submitHandler = e => {
        e.preventDefault()

        fetchData()
    }

    const fetchData = async () => {
        try {
            setLoading(true)

            const { data } = await axios.post(`/api/v1/viewer/create/${slug}`, { full_name: name, otp }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (data.success) {
                setLoading(false)
                // navigate(`/viewer/${data.slug}`)
                console.log(data.user.post_id)
                navigate(`/blog/${data.user.post_id}`)
                alert.success('You may now leave a comment!')
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <input type="text" value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter otp" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter name" />
                <input type='submit' value="submit" />
            </form>
        </div>
    )
}

export default OtpBox
