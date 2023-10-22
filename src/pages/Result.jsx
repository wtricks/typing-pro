import { useEffect, useState } from 'react'
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom'

import { useAlert } from '../contexts/AlertContext'
import Graph from '../components/Graph'
import Header from '../components/Header'
import {
    getDataFromLocalStorage,
    removeDataFromLocalStorage
} from '../utils'
import './Result.css'

export default function Result() {
    const show = useAlert()
    const [search] = useSearchParams()
    const history = useLocation()
    const navigate = useNavigate()

    const [data] = useState(() => {
        const dummy = getDataFromLocalStorage('history', []);
        const dataId = search.get('time');
        const index = dummy.findIndex(h => h.time == dataId);

        if (index == -1) {
            show('Data with id `' + dataId + '` is not found.')
            return { graph: [] }
        }

        return dummy[index]
    })

    useEffect(() => {
        if (data.graph.length == 0) {
            if (history.key !== 'default') {
                window.history.back()
            } else {
                navigate('/', { replace: true })
            }
        }

        removeDataFromLocalStorage('result')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="inner lp">
                    <Graph graphData={data.graph} />
                </div>
                <div className="inner rp rps card">
                    <h2>Result</h2>

                    <h3>Gross WPM</h3>
                    <p>{Math.round((data.totalChar / 5) / (data.taken / 60))}</p>

                    <h3>Net WPM</h3>
                    <p>{Math.round(((data.totalChar - (data.totalChar - data.totalCorrectChar)) / 5) / (data.taken / 60))}</p>

                    <h3>Accuracy</h3>
                    <p>{Math.round((data.totalCorrectChar / data.totalChar) * 100)}</p>

                    <h3>Characters</h3>
                    <p>{data.totalCorrectChar}/{data.totalInCorrectChar}/{data.totalChar - (data.totalCorrectChar + data.totalInCorrectChar)}/{data.totalChar}</p>

                    <button type="button" onClick={() => window.history.back()}>
                        Back to Previous Page
                    </button>
                </div>
            </div>
        </>
    )
}