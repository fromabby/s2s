import React, { useReducer, useContext, useEffect } from 'react'
import AuthContext from '../../context/authContext'
import { useAlert } from 'react-alert'
import { Link, useNavigate } from 'react-router-dom'

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

const Login = () => {

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
            <form onSubmit={submitHandler}>
                <input type="email" value={email.value} onBlur={validateEmail} onChange={emailChangeHandler} />
                <input type="password" value={password.value} onBlur={validatePassword} onChange={passwordChangeHandler} />
                <button type="submit" value="submit" disabled={loading ? true : false}>Submit</button>
                <Link to='/forgot-password'>Forgot password?</Link>                
            </form>
        </div>
    )
}

export default Login