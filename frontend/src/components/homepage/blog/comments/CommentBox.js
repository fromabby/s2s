import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useAlert } from "react-alert";
import CommentContext from "../../../../context/commentContext";
import words from "../../../../obsceneWords";

const CommentBox = ({ post_id }) => {
  const [comment, setComment] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);

  const { commentState, verifyUser, addComment, dispatchUser, logout } =
    useContext(CommentContext);

  const {
    currentUser,
    isLoading,
    isSlug,
    slug,
    isVerified,
    error,
    allComments,
  } = commentState;

  const navigate = useNavigate();
  const alert = useAlert();

  const [responseCount, setResponseCount] = useState(
    allComments.filter(
      (comment) =>
        comment?.user?._id === currentUser?.user?._id &&
        new Date(comment.createdAt).getDate() === new Date(Date.now()).getDate()
    ).length
  );

  useEffect(() => {
    dispatchUser({ type: "RESET_SLUG" });
  }, []);

  useEffect(() => {
    setResponseCount(
      allComments.filter(
        (comment) =>
          comment?.user?._id === currentUser?.user?._id &&
          new Date(comment.createdAt).getDate() ===
            new Date(Date.now()).getDate()
      ).length
    );
  }, [allComments, currentUser]);

  console.log(responseCount)

  useEffect(() => {
    if (isSlug) {
      if (currentUser.user.status === 0) {
        navigate(`/verify/${slug}`);
        alert.success("An OTP has been sent to your email.");
      } else {
        setVerified(true);
      }
    }
  }, [isSlug, error]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (isVerified || verified) {
      postComment();
    } else {
      verifyUser(email, post_id);
    }
  };

  const postComment = async () => {
    try {
      if (comment) {
        if (responseCount < 20) {
          //filter
          var fail = false;
          words.forEach((word) => {
            if (
              comment.toLocaleLowerCase().includes(word.toLocaleLowerCase())
            ) {
              fail = true;
            }
          });
          if (!fail) {
            addComment(comment, post_id);
            setComment("");
            alert.success(`Comment has been posted. Subject for approval`);
          } else {
            alert.error("Please use appropriate words!");
          }
        } else {
          alert.error("You've exceeded maximum responses for today");
        }
      }
    } catch (error) {
      alert.error("cannot post comment");
    }
  };

  return (
    <div className="content-leave-header">
      {verified || isVerified ? (
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" style={{ width: "100%" }}>
            <Form.Label>Leave a comment</Form.Label>
            <textarea
              class="form-control"
              rows="3"
              name="comment"
              placeholder="Leave a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </Form.Group>
          <Button
            type="submit"
            className="admin-button primary"
            disabled={isLoading}
          >
            Submit
          </Button>
          <Button
            variant="danger"
            className="admin-button danger"
            onClick={() => {
              if (window.confirm("Are you sure you want to logout?")) {
                logout();
                setVerified(false);
              }
            }}
          >
            Logout
          </Button>
        </Form>
      ) : (
        <>
          <Form className="loginForm" onSubmit={submitHandler}>
            <img src="/images/logo.png" className="loginLogo" />
            <Form.Group className="inputField">
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <button
              className="login-button primary"
              type="submit"
              disabled={isLoading ? true : false}
            >
              Submit
            </button>
          </Form>
        </>
      )}
    </div>
  );
};

export default CommentBox;
