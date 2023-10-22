import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"

import "./index.css"
import { AuthProvider } from './contexts/AuthContext';
import { AlertProvider } from './contexts/AlertContext'
import Home from './pages/Home';
import Result from './pages/Result';
import Profile from './pages/Profile';
import Auth from './pages/Auth'
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />
    },
    {
        path: "/result",
        element: <Result />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/auth",
        element: <Auth />
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    // <React.StrictMode>
    <AuthProvider>
        <AlertProvider>
            <RouterProvider router={router} />
        </AlertProvider>
    </AuthProvider>
    // </React.StrictMode>,
)
