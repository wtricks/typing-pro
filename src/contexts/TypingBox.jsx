import { createContext, useContext, useRef, useState } from 'react'

/**
 * Context for storing information about typing
 */
const TypingBoxContext = createContext()


// eslint-disable-next-line react/prop-types
export const TypingBoxProvider = ({ children }) => {
    const [config, setConfig] = useState([15, 120])
    const [time, setTime] = useState(config[1])
    const [words, setWords] = useState([])
    const interval = useRef()
    const input = useRef()

    const resetEveryting = () => {
        console.log(setTime, setWords, interval)
    }
    
    return (
        <TypingBoxContext.Provider
            value={{
                words,
                reset: resetEveryting,
                time,
                input,
                config,
                setConfig
            }}
        >
            { children }
        </TypingBoxContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTypingBox = () => {
    return useContext(TypingBoxContext)
}