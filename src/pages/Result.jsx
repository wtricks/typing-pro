import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getDoc, doc } from 'firebase/firestore'
import { useDispatch } from 'react-redux'

import Graph from '../components/Graph'
import Header from '../components/Header'
import { auth, db } from '../firebase'
import { alert } from '../store/Alert'


import './Result.css'

export default function Result() {
    const dispatch = useDispatch()
    const history = useLocation()
    const navigate = useNavigate()

    const { id } = useParams()
    const [data, setData] = useState({})

    useEffect(() => {
        getDoc(doc(db, 'history', id))
            .then(doc => {
                if (doc.exists()) {
                    setData({
                        ...doc.data(),
                        graph: JSON.parse(doc.data().graph)
                    })

                    if (!auth.currentUser) {
                        dispatch(alert("Sign up now, so you can view your scores anytime."))
                    }
                } else if (history.key != 'default') {
                    navigate(-1)
                } else {
                    navigate('/', { replace: true })
                }
            })
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="inner lp">
                    <Graph graphData={data.graph || []} />
                </div>
                <div className="inner rp rps card">
                    <h2>Result</h2>

                    {data.totalChar && (
                        <>
                            <h3>Gross WPM</h3>
                            <p>{Math.round((data.totalChar / 5) / (data.taken / 60))}</p>

                            <h3>Net WPM</h3>
                            <p>{Math.round(((data.totalChar - (data.totalChar - data.totalCorrectChar)) / 5) / (data.taken / 60))}</p>

                            <h3>Accuracy</h3>
                            <p>{Math.round((data.totalCorrectChar / data.totalChar) * 100)}</p>

                            <h3>Characters</h3>
                            <p>{data.totalCorrectChar}/{data.totalInCorrectChar}/{data.totalChar - (data.totalCorrectChar + data.totalInCorrectChar)}/{data.totalChar}</p>
                        </>
                    )}


                    <button type="button" onClick={() => navigate(-1)}>
                        Back to Previous Page
                    </button>
                </div>
            </div>
        </>
    )
}