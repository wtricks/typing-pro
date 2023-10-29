import { useCallback, useEffect, useRef } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { remove } from "../store/Alert"

const Message = ({ message, remove, id }) => {
    const ref = useRef()

    useEffect(() => {
        let interval1 = setTimeout(() => {
            ref.current.classList.add('show')
        }, 30)

        let interval2 = setTimeout(() => {
            remove(id)
        }, 2000)

        return () => {
            clearTimeout(interval1)
            clearTimeout(interval2)
        }
    }, [])

    return (
        <div className="alert-msg" ref={ref}>
            <p>{message}</p>
        </div>
    )
}

// eslint-disable-next-line react/prop-types
export default function Alert() {
    const messages = useSelector((state) => state.alert)
    const dispatch = useDispatch()

    const removeAlertMessage = useCallback((id) => {
        dispatch(remove(id))
    }, [dispatch])

    return (
        <div className="alert-messages">
            {
                messages.map((alert) => (
                    <Message
                        key={alert.id}
                        message={alert.message}
                        id={alert.id}
                        remove={removeAlertMessage}
                    />
                ))
            }
        </div>
    )
}