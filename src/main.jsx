import { useEffect } from 'react';
import ReactDOM from 'react-dom/client'
import { onAuthStateChanged } from 'firebase/auth'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Provider, useDispatch } from 'react-redux';
import { store } from './store';
import { setUser } from './store/user'
import { auth } from './firebase'

import "./index.css"

import Home from './pages/Home';
import Result from './pages/Result';
import Profile from './pages/Profile';
import Auth from './pages/Auth'
import ErrorPage from './pages/ErrorPage';
import Alert from './components/Alert';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/result/:id",
        element: <Result />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/auth/:type",
        element: <Auth />
    }
]);

const UserState = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            dispatch(setUser(user ? {
                email: user.email,
                id: user.uid,
                name: user.displayName,
                loginAt: user.metadata.lastSignInTime,
                createdAt: user.metadata.creationTime,
                avatar: user.photoURL
            } : null))
        })
    }, [])
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Alert />
        <UserState />
        <RouterProvider router={router} />
    </Provider>
)
