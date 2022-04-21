import React, { useContext } from "react";
import { useAlert } from "react-alert";
import { Button, Form } from "react-bootstrap";
import CommentContext from "../../../context/commentContext";
import { MDBDataTableV5 } from "mdbreact";
import Metadata from "../../layout/Metadata";
import formatDate from "../../../formatDate";
import Load from "../../layout/Load";

const CommentList = ({ title }) => {
  const { commentState, updateComment, adminDeleteComment } =
    useContext(CommentContext);
  const { allComments, isLoading } = commentState;

  const alert = useAlert();

  const updateItem = (comment) => {
    updateComment(comment, !comment.status);
    if (comment.status == 0) {
      alert.success("Comment Approved");
    } else {
      alert.error("Comment Denied");
    }
  };

  const deleteItem = (id) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      adminDeleteComment(id);
      alert.success("Comment Deleted");
    }
  };

  const setData = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          width: 200,
        },
        {
          label: "EMAIL",
          field: "email",
          width: 200,
        },
        {
          label: "NAME",
          field: "name",
          width: 200,
        },
        {
          label: "RESPONSE",
          field: "response",
          width: 200,
        },
        {
          label: "DATE",
          field: "date",
          width: 200,
        },
        {
          label: "STATUS",
          field: "status",
          width: 200,
        },
        {
          label: "ACTIONS",
          field: "actions",
          width: 200,
        },
      ],
      rows: [],
    };
    allComments &&
      allComments.forEach((comment, index) => {
        const { user, createdAt, content, status, _id: id } = comment;
        if (status !== 1) {
          data.rows.push({
            id: index + 1,
            email: user?.email,
            name: user?.full_name,
            response: content,
            date: formatDate(createdAt),
            status: status === 1 ? "Approved" : "For Approval",
            actions: (
              <div>
                <Button
                  variant="success"
                  className="success admin-button"
                  onClick={() => updateItem(comment, status)}
                >
                  Approve
                </Button>
                <Button
                  variant="danger"
                  className="danger admin-button"
                  onClick={() => deleteItem(id)}
                >
                  Deny
                </Button>
              </div>
            ),
          });
        }
      });

    return data;
  };

  return (
    <>
      <Metadata title={title} />
      {isLoading ? (
        <Load />
      ) : (
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
      )}
    </>
  );
};

export default CommentList;
