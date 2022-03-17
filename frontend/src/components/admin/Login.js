import React, { useReducer, useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import { Button, Form } from 'react-bootstrap'

const emailReducer = (state, action) => {
    switch (action.type) {
        case "EMAIL_INPUT":
            return { value: action.payload, isValid: false }
        case "EMAIL_INPUT_DONE":
            return { value: state.value, isValid: state.value.includes('@') }
        default:
            return { value: "", isValid: false }
    }
};


const passwordReducer = (state, action) => {
    switch (action.type) {
        case "PASSWORD_INPUT":
            return { value: action.payload, isValid: false }
        case "PASSWORD_INPUT_DONE":
            return { value: state.value, isValid: (state.value.length > 6) }
        default:
            return { value: '', isValid: false }
    }
}

const Login = ({ title }) => {

    const [email, dispatchEmail] = useReducer(emailReducer, { value: '', isValid: false });
    const [password, dispatchPassword] = useReducer(passwordReducer, { value: '', isValid: false })

    const { login, auth } = useContext(AuthContext)
    const { loading, error, isAuthenticated } = auth

    const alert = useAlert()
    const navigate = useNavigate()

    const emailChangeHandler = (e) => {
        dispatchEmail({ type: 'EMAIL_INPUT', payload: e.target.value })
    }

    const validateEmail = () => {
        dispatchEmail({ type: 'EMAIL_INPUT_DONE' })
    }

    const passwordChangeHandler = (e) => {
        dispatchPassword({ type: 'PASSWORD_INPUT', payload: e.target.value })
    }

    const validatePassword = () => {
        dispatchPassword({ type: 'PASSWORD_INPUT_DONE' })
    }

    const submitHandler = e => {
        e.preventDefault()
        login({ email: email.value, password: password.value })

    }

    useEffect(() => {
        if (isAuthenticated) {
            alert.success("Logged in successfully")
            navigate('/')
        }
        if (error) {
            alert.error(error)
        }
    }, [isAuthenticated, error])

    return (
        <div>
            <Metadata title={title} />
            <Form className="container mt-2" onSubmit={submitHandler}>
                <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" name="email" placeholder="Enter email address" onChange={emailChangeHandler} required />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Enter password" onChange={passwordChangeHandler} required />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading ? true : false} >
                    Submit
                </Button>
                <Link to='/forgot-password'>Forgot password?</Link>
            </Form>
        </div>
    )
}

export default Login