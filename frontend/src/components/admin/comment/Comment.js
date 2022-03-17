import React from 'react'
import { useAlert } from 'react-alert'
import { Button, Form } from 'react-bootstrap'
import formatDate from '../../../formatDate'

const Comment = (props) => {
  const { index, comment, updateComment } = props
  const { user, createdAt, content, status } = comment

  const alert = useAlert()

  const updateItem = () => {
    updateComment(comment, !status)
    if (status == 0) {
      alert.success("Comment Allowed")
    }
    else {
      alert.error("Comment Denied")
    }
  }

  return (
    <tr>
      <td>
        <div className='td-container'>
          {index}
        </div>
      </td>
      <td>
        <div className='td-container'>
          {user?.email}
        </div>
      </td>
      <td>
        <div className='td-container'>
          {content}
        </div>
      </td>
      <td>
        <div className='td-container'>
          {formatDate(createdAt)}
        </div>
      </td>
      <td>
        <div className='td-container'>
          <Form.Check
            checked={status === 1 ? true : false}
            type="switch"
            label="Allow"
            id="disabled-custom-switch"
            onChange={updateItem}
          />
        </div>
      </td>
    </tr>
  )
}

export default Comment