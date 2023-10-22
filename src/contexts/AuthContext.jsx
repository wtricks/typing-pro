import { createContext, useContext, useState } from "react";
import { getDataFromLocalStorage, removeDataFromLocalStorage, setDataToLocalStorage } from '../utils'

/**
 * Store user's related information
 */
const AuthContext = createContext()

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        return getDataFromLocalStorage('user')
    })

    const [history, setHistory] = useState(() => {
        return getDataFromLocalStorage('history', [])
    })

    const logoutUser = () => {
        setUser(null)
        removeDataFromLocalStorage('user')
    }

    const signInUser = (name, email, password, createdAt) => {
        const data = { email, name, password, createdAt, loginAt: new Date().getTime() }
        setUser(data)
        setDataToLocalStorage('user', data)
    }

    return (
        <AuthContext.Provider value={{ user, signInUser, logoutUser, history, setHistory }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}