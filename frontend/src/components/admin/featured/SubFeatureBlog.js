import axios from 'axios'
import React, { useState } from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import formatDate from '../../../formatDate'

const Blog = (props) => {

    const { title, content, images, author, _id: id, createdAt, isArchived, isSubFeature } = props.post
    const { updateItem, count } = props

    const alert = useAlert()

    console.log(count)

    const updateFeature = () => {

        try {
            const multiformdata = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const updatePost = async () => {
                const { data } = await axios.put(`/api/v1/posts/${id}`, { ...props.post, isSubFeature: !isSubFeature }, multiformdata)
                if (data.success) {
                    updateItem(props.post, data.post)
                    if (isSubFeature) {
                        alert.success("Removed subfeatured post")
                    } else {
                        alert.success("Post added to Subfeatures")
                    }
                }
            }

            if (isSubFeature) {
                updatePost()
            } else {
                if (count < 3) {
                    updatePost()
                }
                else {
                    alert.error("Only three featured post allowed!")
                }
            }

        }
        catch (error) {
            alert.error("Error")
            console.log(error)
        }
    }


    return (
        <tr>
            <td>
                <div className='td-container'>
                    {props.index}
                </div>
            </td>
            <td>
                <div className='td-container'>
                    <div className='image-wrapper'>
                        <img className='image' src={images[0].path} />
                    </div>
                </div>
            </td>
            <td>
                <div className='td-container'>
                    {title}
                </div>
            </td>
            <td>
                <div className='td-container'>
                    <Form.Check
                        checked={isSubFeature}
                        type="switch"
                        label="Subfeature"
                        id="disabled-custom-switch"
                        onChange={(updateFeature)}
                    />
                </div>
            </td>
        </tr>
    )
}

export default Blog