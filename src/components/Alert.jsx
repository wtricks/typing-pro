import { useEffect, useRef } from "react"

// eslint-disable-next-line react/prop-types
export default function Alert({ message, removeMessage, index }) {
    const alertDiv = useRef()

    useEffect(() => {
        setTimeout(() => alertDiv.current.classList.add('show'), 40)

        let interval = setTimeout(() => {
            alertDiv.current.classList.remove('show')
            setTimeout(() => removeMessage(index), 40)
        }, 2000)

        return () => clearTimeout(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="alert-msg" ref={alertDiv}>
            <p>{message}</p>
        </div>
    )
}
