import { useContext, createContext, useState } from 'react'

import Alert from '../components/Alert'

/**
 * Hold alert messages
 */
const AlertContext = createContext()

// eslint-disable-next-line react/prop-types
export const AlertProvider = ({ children }) => {
    const [messages, setMessages] = useState([])

    const removeMessage = (id) => {
        setMessages(prev => prev.filter(el => el.id != id))
    }

    const showAlert = (message) => {
        setMessages(prev => [...prev, { id: Math.random(), message }])
    }

    return (
        <AlertContext.Provider value={showAlert}>
            <div className='alert-messages'>
                {messages.map((alert) => (
                    <Alert
                        key={alert.id}
                        message={alert.message}
                        removeMessage={removeMessage}
                        index={alert.id}
                    />
                ))}
            </div>
            {children}
        </AlertContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAlert() {
    return useContext(AlertContext)
} 