import React, { useContext } from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import CommentContext from '../../../context/commentContext'
import Comment from './Comment'
import { MDBDataTableV5 } from 'mdbreact'
import formatDate from '../../../formatDate'
const CommentList = () => {


    const { commentState, updateComment } = useContext(CommentContext)
    const { allComments } = commentState

    const alert = useAlert()

    const updateItem = (comment) => {
        updateComment(comment, !comment.status)
        if (comment.status == 0) {
            alert.success("Comment Allowed")
        }
        else {
            alert.error("Comment Denied")
        }
    }

    const setData = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    width: 200,
                },
                {
                    label: 'EMAIL',
                    field: 'email',
                    width: 200,
                },
                {
                    label: 'RESPONSE',
                    field: 'response',
                    width: 200,
                },
                {
                    label: 'DATE',
                    field: 'date',
                    width: 200,
                },
                {
                    label: 'ACTIONS',
                    field: 'actions',
                    width: 200,
                }
            ],
            rows: []
        }
        allComments && allComments.forEach((comment, index) => {
            const { user, createdAt, content, status } = comment
            data.rows.push({
                id: <div className='td-container'>
                    {index + 1}
                </div>,
                email: <div className='td-container'>
                    {user?.email}
                </div>,
                response: <div className='td-container'>
                    {content}
                </div>,
                date: <div className='td-container'>
                    {formatDate(createdAt)}
                </div>,
                actions: <div className='td-container'>
                    <Form.Check
                        checked={comment.status === 1 ? true : false}
                        type="switch"
                        label="Allow"
                        id="disabled-custom-switch"
                        onChange={updateItem}
                    />
                </div>
            })
        })

        return data
    }

    return (
        // <Table responsive="sm">
        //     <thead>
        //         <tr>
        //             <th scope="col">ID</th>
        //             <th scope="col">EMAIL</th>
        //             <th scope="col">RESPONSE</th>
        //             <th scope="col">DATE</th>
        //             <th scope="col">ACTION</th>
        //         </tr>
        //     </thead>
        //     <tbody>
        //         {
        //             allComments.map((comment, index) => (
        //                 <Comment comment={comment} index={index + 1} updateComment={updateComment} />
        //             ))
        //         }
        //     </tbody>
        // </Table>

        <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={setData()}
            fullPagination
        />
    )
}

export default CommentList