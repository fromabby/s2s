import React, { useReducer, useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'
import Metadata from '../layout/Metadata'
import { Button, Form } from 'react-bootstrap'
import '../layout/css/Login.css'

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
            navigate('/admin/banner')
        }
        if (error) {
            alert.error(error)
        }
    }, [isAuthenticated, error])

    return (
        <div className='loginDiv'>
            <Metadata title={title} />
            <Form className="loginForm" onSubmit={submitHandler}>
                <img src='/images/logo.png' className='loginLogo' />
                <Form.Group className="inputField">
                    <Form.Control type="text" name="email" placeholder="Email" onChange={emailChangeHandler} required />
                </Form.Group>
                <Form.Group className='inputField'>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={passwordChangeHandler} required />
                </Form.Group>
                <div className='forgotPasswordDiv'>
                    <Link to='/forgot-password'>Forgot password?</Link>
                </div>
                <div className='d-flex flex-column container align-items-center my-2'>
                    <button type="submit" className='login-button' disabled={loading ? true : false} >
                        Submit
                    </button>
                </div>

            </Form>
        </div>
    )
}

export default Login