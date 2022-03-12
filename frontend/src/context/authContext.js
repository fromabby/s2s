import axios from 'axios';
import { createContext, useEffect, useState } from 'react'

const AuthContext = createContext({
    isLoggedIn: false,
});

export const AuthContextProvider = props => {
    //initial value
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})

    const logoutHandler = () => {
        setIsLoggedIn(false)
    }

    const loginHandler = () => {
        setIsLoggedIn(true)
    }

    useEffect(() => {
        const fetchUser = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/v1/login',
                {
                    email: "test@test.com",
                    password: "Test1234"
                }, config)

            if (data) {
                setUser(data.user)
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={{ user }}>
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthContext