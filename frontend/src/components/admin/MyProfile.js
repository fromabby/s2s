import React, { useContext, useEffect } from "react";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import { Button, Form } from "react-bootstrap";
import Load from "../layout/Load";
import Metadata from "../layout/Metadata";

const MyProfile = ({ title }) => {
  const alert = useAlert();

  const { auth } = useContext(AuthContext);
  const { loading, user, loadError } = auth;

  useEffect(() => {
    if (loadError) {
      alert.error(loadError);
    }
  }, [user, loadError]);

  return (
    <div>
      <Metadata title={title} />
      {loading ? (
        <Load />
      ) : (
        <>
          <div className="loginDiv" style={{ marginTop: "-50px" }}>
            <h3>My Profile</h3>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={user.email} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={`${user.name?.first_name} ${user.name?.last_name}`}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={user.role} disabled />
            </Form.Group>

            <Link to="/admin/me/update">
              <Button
                variant="primary"
                className="admin-button primary"
                style={{ width: "fit-content" }}
              >
                Update Profile
              </Button>
            </Link>
            <Link to="/admin/password/update">
              <Button
                variant="success"
                className="admin-button"
                style={{ width: "fit-content" }}
              >
                Update Password
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
