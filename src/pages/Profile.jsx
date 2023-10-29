import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

import { alert } from '../store/Alert'
import Header from '../components/Header'
import './Profile.css'

export default function Profile() {
    const dispatch = useDispatch()
    const history = useLocation()
    const navigate = useNavigate()

    const user = useSelector(state => state.auth)
    const dataHistory = useSelector(state => state.history)

    useEffect(() => {
        if (!user) {
            if (history.key !== 'default') {
                window.history.back()
            } else {
                navigate('/', { replace: true })
            }

            dispatch(alert('You need to login to your account.'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container profile">
                <div className="inner lp card">
                    <div className="avatar">
                        {/* Image here */}
                    </div>

                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <p>Passowrd: {user.password}</p>
                    <p>Login At: {new Date(user.loginAt).toLocaleString()}</p>
                    <p>Registred At: {new Date(user.createdAt).toUTCString()}</p>
                </div>
                <div className="inner rp card">
                    <h2>History</h2>

                    {dataHistory.length == 0 && (
                        <p className='not'>You have no saved work.</p>
                    )}

                    <ul className='history'>
                        {dataHistory.map((item) => (
                            <li onClick={() => navigate('/result?time=' + item.time)} className="item" key={item.time}>
                                <h4>Date: {new Date(item.time).toLocaleString()}</h4>
                                <p>
                                    <b>WPM:</b>
                                    <span>{Math.round(((item.totalChar - (item.totalChar - item.totalCorrectChar)) / 5) / (item.taken / 60))}</span>

                                    <b>Accuracy:</b>
                                    <span>{Math.round((item.totalCorrectChar / item.totalChar) * 100)}</span>
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
