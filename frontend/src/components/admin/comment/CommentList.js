import React, { useContext } from 'react'
import { Table } from 'react-bootstrap'
import CommentContext from '../../../context/commentContext'
import Comment from './Comment'

const CommentList = () => {


    const { commentState, updateComment } = useContext(CommentContext)
    const { allComments } = commentState

    return (
        <Table responsive="sm">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">RESPONSE</th>
                    <th scope="col">DATE</th>
                    <th scope="col">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    allComments.map((comment, index) => (
                        <Comment comment={comment} index={index + 1} updateComment={updateComment} />
                    ))
                }
            </tbody>
        </Table>
    )
}

export default CommentList