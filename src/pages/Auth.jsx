import { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate, NavLink, useParams } from 'react-router-dom'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

import { auth } from '../firebase'
import { alert } from '../store/Alert'
import { setUser } from '../store/user'

import Header from '../components/Header'
import './Auth.css'

export default function Auth() {
    const { type } = useParams()
    const history = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cpass, setCPass] = useState('')

    const show = useCallback((message) => {
        dispatch(alert(message))
    }, [dispatch])

    const onSubmit = async (e) => {
        const isSignInPage = type == 'signin';
        e.preventDefault();

        if (!name && !isSignInPage) {
            show('Name is required.')
        } else if (!email) {
            show('Email address is required.')
        } else if (!pass) {
            show('Password is required.')
        } else if (cpass.length < 6 && !isSignInPage) {
            show('Weak Password, Its length should be more than 6.')
        } else if (cpass != pass && !isSignInPage) {
            show('Confirm Password does not matched.')
        } else if (isSignInPage) {
            setLoading(true);

            signInWithEmailAndPassword(auth, email, pass)
                .then(() => {
                    show('Sign in successfully!')
                    navigate('/', { replace: true })
                })
                .catch(err => {
                    if (err.code == 'auth/invalid-credential') {
                        show("Invalid credential given.")
                    } else {
                        show("An error occured: " + err.code?.slice(5))
                    }
                })
                .finally(() => setLoading(false))
        } else {
            setLoading(true)
            createUserWithEmailAndPassword(auth, email, pass, name)
                .then((userCredential) => {
                    updateProfile(userCredential.user, { displayName: name })
                        .then(() => {
                            dispatch(setUser({
                                ...user,
                                name: name,
                            }))
                        })

                    show('Account created and logged in successfully.')
                    navigate('/', { replace: true })
                }).catch(err => {
                    if (err.code == 'auth/email-already-in-use') {
                        show("Email address is already taken.")
                    } else {
                        show("An error occured: " + err.code?.slice(5))
                    }
                }).finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        if (user) {
            if (history.key !== 'default') {
                navigate(-1)
            } else {
                navigate('/', { replace: true })
            }
            dispatch(alert('You have already logged in.'))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header />
            <div className="container">
                <div className="inner lp auth card">
                    <div className="tabs">
                        <NavLink to="/auth/signin" title="Login to existing account." className={({ isActive }) => isActive ? 'active' : ''}>
                            Sign in
                        </NavLink>
                        <NavLink to="/auth/signup" title="Create a new account." className={({ isActive }) => isActive ? 'active' : ''}>
                            Sign up
                        </NavLink>
                    </div>

                    <form onSubmit={onSubmit} action={"/auth/" + type} method='post'>
                        {type == 'signup' && <input value={name} onChange={e => setName(e.target.value)} type="text" name="name" id="name" placeholder='Full name' />}

                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" placeholder='Email Address' />

                        <input value={pass} onChange={e => setPass(e.target.value)} type="password" name="password" id="pass" placeholder='Password' />

                        {type == 'signup' && <input value={cpass} onChange={e => setCPass(e.target.value)} type="password" name="confirm password" id="cpass" placeholder='Confirm Password' />}

                        <button disabled={loading} type="submit">{type == 'signin' ? 'Sign in' : 'Sign up'}</button>
                    </form>
                </div>
            </div>
        </>
    )
}