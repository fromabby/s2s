import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import AuthContext from "../../context/authContext";
import Metadata from "../layout/Metadata";

const UpdatePassword = ({ title }) => {
  const alert = useAlert();
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { auth, updatePassword } = useContext(AuthContext);
  const { loading, isUpdated, error, user } = auth;

  useEffect(() => {
    if (isUpdated) {
      alert.success("Password has been updated.");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
    }

    if (error) {
      alert.error(error);
    }
  }, [alert, navigate, isUpdated, error]);


  const submitHandler = (e) => {
    e.preventDefault();

    if (oldPassword === confirmPassword) {
      alert.error("New password must be different from old password!");
    } else {
      updatePassword({ oldPassword, password, confirmPassword });
    }
  };

  return (
    <div className="loginDiv">
      <Metadata title={title} />
      <Form className="loginForm" onSubmit={submitHandler}>
        <Form.Group className="inputField">
          <Form.Control
            type="password"
            value={oldPassword}
            placeholder="Enter old password"
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="inputField">
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter new password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="inputField">
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm new password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>
        <div className="d-flex flex-column container align-items-center my-2">
          <button
            type="submit"
            className="login-button"
            disabled={loading ? true : false}
          >
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

export default UpdatePassword;
