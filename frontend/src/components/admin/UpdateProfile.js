import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/authContext";
import Metadata from "../layout/Metadata";
import { Button, Form } from "react-bootstrap";

const UpdateProfile = ({ title }) => {
    const alert = useAlert();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const { auth, updateProfile, loadUser } = useContext(AuthContext);
    const { loading, isUpdated, loadError, user, error } = auth;

    useEffect(() => {
        if (!loading) {
            if (loadError) {
                navigate("/");
                alert.error(loadError);
            }

            if (isUpdated) {
                alert.success("Profile has been updated.");
                loadUser();
                navigate("/admin/me");
            }

            if (error) {
                alert.error("Profile cannot be updated.");
                navigate("/admin/me");
            }

            setEmail(user.email);
            setFirstName(user.name.first_name);
            setLastName(user.name.last_name);
        }
    }, [alert, loadError, user, navigate, isUpdated, error]);

    const submitHandler = (e) => {
        e.preventDefault();

        updateProfile({ name: { first_name: firstName, last_name: lastName } });
    };

    return (
        <div>
            <Metadata title={title} />
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <Form className="container mt-2" onSubmit={submitHandler}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" value={email} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Control type="text" value={user.role} disabled />
                    </Form.Group>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </div>
    );
};

export default UpdateProfile;
