import { createContext, useState } from 'react'

const AuthContext = createContext({
    isLoggedIn: false,
});

export const AuthContextProvider = props => {
    //initial value
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = () => {
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        setIsLoggedIn(true)
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthContext