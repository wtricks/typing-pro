import { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useAlert } from '../contexts/AlertContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils'


export default function Header() {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logoutUser } = useAuth()
    const [theme, setTheme] = useState(() => {
        return getDataFromLocalStorage('theme', 'light')
    })

    const show = useAlert()

    useEffect(() => {
        document.body.classList.remove(theme == 'dark' ? 'light' : 'dark')
        document.body.classList.add(theme)
        setDataToLocalStorage('theme', theme)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme])

    const onProfileButtonClick = () => {
        const page = user ? '/profile' : '/auth'
        if (location.pathname == page) {
            return
        }

        navigate(page)
    }

    const onThemeButtonCLick = () => {
        setTheme(theme == 'light' ? 'dark' : 'light')
        show((theme == 'light' ? 'dark' : 'light') + ' mode')
    }

    const onLogout = () => {
        logoutUser()
        navigate('/', { replace: true })
        show('Logout successfully!')
    }

    return (
        <header className="header">
            <a href="/" className="logo">
                <span>Typing Pro</span>

                <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"></path>
                </svg>
            </a>

            <div className="profile-section">
                <button title="Theme" type="button" className='btn' onClick={onThemeButtonCLick}>
                    {
                        theme == 'dark' ? (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )
                    }
                </button>

                <button title="Account" type="button" className='btn' onClick={onProfileButtonClick}>
                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"></path>
                    </svg>
                </button>

                {!!user && (
                    <button title="Logout" type="button" className='btn' onClick={onLogout}>
                        <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24">
                            <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"></path>
                        </svg>
                    </button>
                )}
            </div>
        </header>
    )
}