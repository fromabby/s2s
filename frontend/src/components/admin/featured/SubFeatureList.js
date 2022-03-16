import React, { useContext, useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import PostContext from '../../../context/postContext'
import Blog from './SubFeatureBlog'
import './Blog.css'

const SubFeatureList = () => {

    const { posts: data, updateData } = useContext(PostContext)
    const { posts, isLoading } = data

    let subfeatureCount = posts.filter(post => post.isSubFeature === true).length

    return (
        isLoading ? <>Loading</>
            :
            <div className='manage-post-div'>
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
                                (!post.isFeature && !post.isArchived) &&
                                <Blog post={post} updateItem={updateData} index={index + 1} count={subfeatureCount} />
                            ))
                        }
                    </tbody>
                </Table>
            </div>
    )
}

export default SubFeatureList