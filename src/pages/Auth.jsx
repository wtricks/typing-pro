import { useEffect, useState } from 'react'
import Header from '../components/Header'
import './Auth.css'
import { useAlert } from '../contexts/AlertContext'
import { getDataFromLocalStorage, setDataToLocalStorage } from '../utils'
import { useAuth } from '../contexts/AuthContext'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Auth() {
    const show = useAlert()
    const history = useLocation()
    const navigate = useNavigate()
    const { signInUser, user } = useAuth()
    const [type, setType] = useState('signin')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cpass, setCPass] = useState('')

    const changeType = (e, type) => {
        e.preventDefault()
        setName('')
        setEmail('')
        setPass('')
        setCPass('')

        setType(type)
    }

    const onSubmit = (e) => {
        const isSignInPage = type == 'signin';
        e.preventDefault();

        if (!name && !isSignInPage) {
            show('Name is required.')
        } else if (!email) {
            show('Email address is required.')
        } else if (!pass) {
            show('Password is required.')
        } else if (cpass != pass && !isSignInPage) {
            show('Confirm Password does not matched.')
        } else if (isSignInPage) {
            const users = getDataFromLocalStorage('userDummy', []);
            const user = users[users.findIndex(el => el.email == email)];

            if (!user) {
                show('Account is not found.')
            } else if (user.pass != pass) {
                show('Password does not matched.')
            } else {
                signInUser(user.name, email, pass, user.createdAt)
                show('Sign in successfully!')
                navigate('/', { replace: true })
            }
        } else {
            const users = getDataFromLocalStorage('userDummy', []);
            const user = users[users.findIndex(el => el.email == email)];

            if (user) {
                show('Email address is already taken.')
            } else {
                users.push({ name, email, pass, createdAt: new Date().getTime() })
                setDataToLocalStorage('userDummy', users)

                setName('')
                setEmail('')
                setPass('')
                setCPass('')
                show('Signup successfully, Login now')
            }
        }
    }

    useEffect(() => {
        if (user) {
            if (history.key !== 'default') {
                window.history.back()
            } else {
                navigate('/', { replace: true })
            }

            show('You are already logged in.')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="inner lp auth card">
                    <div className="tabs">
                        <a onClick={e => changeType(e, 'signin')} href="/auth/signin" title="Login to existing account." className={type == 'signin' ? 'active' : ''}>
                            Sign in
                        </a>

                        <a onClick={e => changeType(e, 'signup')} href="/auth/signup" title="Create a new account." className={type == 'signup' ? 'active' : ''}>
                            Sign up
                        </a>
                    </div>

                    <form onSubmit={onSubmit} action={"/auth/" + type} method='post'>
                        {type == 'signup' && <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder='Full name' />}

                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email Address' />

                        <input value={pass} onChange={e => setPass(e.target.value)} type="password" name="password" id="pass" placeholder='Password' />

                        {type == 'signup' && <input value={cpass} onChange={e => setCPass(e.target.value)} type="password" name="confirm password" id="cpass" placeholder='Confirm Password' />}

                        <button type="submit">{type == 'signin' ? 'Sign in' : 'Sign up'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}