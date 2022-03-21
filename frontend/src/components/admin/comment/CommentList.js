import React, { useContext } from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import CommentContext from '../../../context/commentContext'
import Comment from './Comment'
import { MDBDataTableV5 } from 'mdbreact'
import formatDate from '../../../formatDate'
const CommentList = () => {


    const { commentState, updateComment, adminDeleteComment } = useContext(CommentContext)
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


    const deleteItem = (id) => {
        adminDeleteComment(id)
        alert.success("Comment Deleted")
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
                    label: 'NAME',
                    field: 'name',
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
                    label: 'STATUS',
                    field: 'status',
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
            const { user, createdAt, content, status, _id: id } = comment
            data.rows.push({
                id: index + 1,
                email: user?.email,
                name: user?.full_name,
                response: content,
                date: formatDate(createdAt),
                status: status === 1 ? 'Allowed' : 'Denied',
                actions: <div>
                    {/* <Form.Check
                        checked={comment.status === 1 ? true : false}
                        type="switch"
                        label="Allow"
                        id="disabled-custom-switch"
                        onChange={() => updateItem(comment, status)}
                    /> */}
                    <Button variant={status === 1 ? 'danger' : 'success'} className={`${status === 1 ? 'danger' : 'success'} admin-button`} onClick={() => updateItem(comment, status)}>
                        {status === 1 ? 'Deny' : 'Allow'}
                    </Button>
                    <Button variant="danger" className="danger admin-button" onClick={() => deleteItem(id)}>
                        Delete
                    </Button>
                </div>
            })
        })

        return data
    }

    return (

        <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={setData()}
            fullPagination
            searchTop
            searchBottom={false}
        />
    )
}

export default CommentList