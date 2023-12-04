import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore'

import { alert } from '../store/Alert'
import Header from '../components/Header'
import './Profile.css'

import { auth, db } from '../firebase'

export default function Profile() {
    const dispatch = useDispatch()
    const history = useLocation()
    const navigate = useNavigate()
    const [typingHistory, setTypingHistory] = useState([]);

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user) {
            if (history.key !== 'default') {
                navigate(-1)
            } else {
                navigate('/', { replace: true })
            }

            dispatch(alert('You need to login to your account.'))
        } else {
            const q = query(collection(db, 'history'), where('createdBy', '==', user.id))
            getDocs(q)
                .then((doc) => {
                    doc.forEach(doc => {
                        typingHistory.push({ ...doc.data(), id: doc.id })
                    })
                    setTypingHistory([...typingHistory]);
                })
                .catch((err) => {
                    dispatch(alert("An error occured while fetching history."))
                })
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

                    <h2>{user?.name}</h2>
                    <p>{user?.email}</p>
                    <p>Login At: {user?.loginAt}</p>
                    <p>Registred At: {user?.createdAt}</p>
                </div>
                <div className="inner rp card">
                    <h2>History</h2>

                    {typingHistory.length == 0 && (
                        <p className='not'>You have no saved work.</p>
                    )}

                    <ul className='history'>
                        {typingHistory.map((item) => (
                            <li onClick={() => navigate('/result/' + item.id)} className="item" key={item.time}>
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
