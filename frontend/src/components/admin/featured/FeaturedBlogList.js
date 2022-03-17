import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import PostContext from '../../../context/postContext'
import Blog from './FeatureBlog'
import './Blog.css'
import Metadata from '../../layout/Metadata'
import SubFeatureList from './SubFeatureList'

const FeaturedBlogList = ({ title }) => {

    const { posts: data, updateData } = useContext(PostContext)
    const { posts, isLoading } = data

    let featureCount = posts.filter(post => post.isFeature === true).length

    return (
        isLoading ? <>Loading</>
            :
            <div className='manage-post-div'>
                <Metadata title={title} />
                <h1>FEATURED POST</h1>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">IMAGE</th>
                            <th scope="col">TITLE</th>
                            <th scope="col">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            posts.map((post, index) => (
                                !post.isArchived &&
                                <Blog post={post} updateItem={updateData} index={index + 1} count={featureCount} />
                            ))
                        }
                    </tbody>
                </Table>
                <h1>SUBFEATURED POST</h1>
                <SubFeatureList />
            </div>
    )
}

export default FeaturedBlogList