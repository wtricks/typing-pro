import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { Provider } from 'react-redux';
import { store } from './store';

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
    <Provider store={store}>
        <Alert />
        <RouterProvider router={router} />
    </Provider>
    // </React.StrictMode>,
)
