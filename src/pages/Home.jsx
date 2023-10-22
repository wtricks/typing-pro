import { useEffect, useRef, useState } from "react";
import { generate } from 'random-words'
import { useNavigate } from 'react-router-dom'

import "./Home.css"
import { getDataFromLocalStorage, setDataToLocalStorage } from "../utils";
import Header from '../components/Header'

export default function Home() {
    const navigate = useNavigate()

    const [config, setConfig] = useState([60, 50])
    const [words, setWords] = useState([])
    const [time, setTime] = useState(120)
    const [active, setActive] = useState(-1)

    const graph = useRef()
    const input = useRef()
    const isOver = useRef()
    const interval = useRef()
    const timeInput = useRef()
    const correctChar = useRef()
    const lengthInput = useRef()
    const dummyText = useRef('')

    const getClassName = (letterIndex) => {
        if (letterIndex == 0) {
            correctChar.current = 0
        }

        const cursor = (letterIndex == active ? ' cursor' : '')
        const inputLetter = input.current.value[letterIndex]
        const realLetter = dummyText.current[letterIndex]

        if (inputLetter == realLetter) {
            correctChar.current++;
            return 'right' + cursor
        } else if (inputLetter != undefined) {
            return 'wrong' + cursor
        }

        return cursor
    }

    const getTimeInString = () => {
        const hour = Math.floor(time / 3600)
        const minutes = Math.floor((time % 3600) / 60)

        return `${`0${hour}`.slice(-2)}:${`0${minutes}`.slice(-2)}:${`0${time % 60}`.slice(-2)}`
    }

    const resetEverything = () => {
        let words = generate(config[1]), index = 0;
        dummyText.current = words.join(" ")
        setWords(words.map((curr) => {
            index += curr.length + 1
            return [curr, index - curr.length - 1]
        }))

        setTime(config[0])
        isOver.current = false;
        correctChar.current = 0
        input.current.value = ''
        graph.current = []
        onFocus()
    }

    const startTimer = () => {
        setActive(input.current.value.length)

        if (interval.current != null) {
            return
        }

        interval.current = setInterval(() => {
            setTime(p => {
                graph.current.push([
                    config[0] - p + 1,
                    (correctChar.current / 5) / (config[0] - p + 1) / 60
                ])

                if (p == 1) {
                    pauseTimer()
                    isOver.current = true;
                    input.current.readOnly = true
                    timeNowEnd()
                }

                return p - 1
            })
        }, 1000)
    }

    const setConfigs = (time, number = config[1]) => {
        setConfig([time == -1 ? config[0] : time, number])
    }

    const pauseTimer = () => {
        clearInterval(interval.current)
        setActive(-1)
        interval.current = null
    }

    const onFocus = () => {
        input.current.focus();
        setActive(input.current.value.length)
    }

    const timeNowEnd = () => {
        let totalCorrectChar = 0;
        let totalInCorrectChar = 0;
        document.querySelectorAll('.inner.lp span').forEach((element) => {
            if (element.classList.contains('right')) {
                totalCorrectChar++;
            } else if (element.classList.contains('wrong')) {
                totalInCorrectChar++;
            }
        })

        let totalChar = dummyText.current.length;

        const dataId = new Date().getTime();
        const history = getDataFromLocalStorage('history', [])
        history.push({
            graph: graph.current,
            totalCorrectChar,
            totalInCorrectChar,
            totalChar,
            taken: config[0],
            time: dataId
        })

        setDataToLocalStorage('history', history)
        navigate("/result?time=" + dataId)
    }

    useEffect(() => {
        resetEverything();
        return pauseTimer;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="inner lp" onClick={onFocus}>
                    {words.map((word, index) => (
                        <div className="word" key={index}>
                            {
                                word[0].split('').map((letter, index) => (<span
                                    key={index}
                                    className={getClassName(word[1] + index)}
                                >
                                    {letter}
                                </span>))
                            }
                            {
                                index + 1 != words.length && (
                                    <span className={getClassName(word[1] + word[0].length) + ' space'}></span>
                                )
                            }
                        </div>
                    ))}

                    <input onBlur={pauseTimer} onChange={startTimer} type="text" name="Hidden INput" id="hidden" ref={input} />
                </div>
                <div className="inner rp card">
                    <div className="timer">
                        <span>{getTimeInString()}</span>
                    </div>

                    <h3>Set time (in seconds)</h3>
                    <div className="row">
                        <button onClick={() => setConfigs(15)} className={config[0] == 15 ? 'active' : ''} type="button">
                            15
                        </button>
                        <button onClick={() => setConfigs(30)} className={config[0] == 30 ? 'active' : ''} type="button">
                            30
                        </button>
                        <button onClick={() => setConfigs(60)} className={config[0] == 60 ? 'active' : ''} type="button">
                            60
                        </button>
                        <input
                            onChange={(e) => setConfigs(parseInt(e.target.value))}
                            ref={timeInput}
                            placeholder="Custom"
                            type="number"
                            accept="number"
                            className={![15, 30, 60].includes(config[0]) ? 'active' : ''}
                        />
                    </div>

                    <h3>Set number of words</h3>
                    <div className="row">
                        <button onClick={() => setConfigs(-1, 10)} className={config[1] == 10 ? 'active' : ''} type="button">
                            10
                        </button>
                        <button onClick={() => setConfigs(-1, 50)} className={config[1] == 50 ? 'active' : ''} type="button">
                            50
                        </button>
                        <button onClick={() => setConfigs(-1, 80)} className={config[1] == 80 ? 'active' : ''} type="button">
                            80
                        </button>
                        <input
                            onChange={(e) => setConfigs(-1, parseInt(e.target.value))}
                            ref={lengthInput}
                            placeholder="Custom"
                            type="number"
                            accept="number"
                            className={![10, 50, 80].includes(config[1]) ? 'active' : ''}
                        />
                    </div>

                    <button onClick={pauseTimer} className='full' type="button">
                        Pause
                    </button>
                    <button onClick={resetEverything} className='full' type="button">
                        Reset
                    </button>
                </div>
            </div>
        </>
    )
}
