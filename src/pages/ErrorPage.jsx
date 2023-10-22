import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import './ErrorPage.css'

export default function ErrorPage() {
    const navigate = useNavigate()

    return (
        <>
            <Header />

            <div className="container">
                <div className="inner lp error card">
                    <h2>404 not found</h2>
                    <p>The page you are looking for, is not found</p>

                    <button type="button" onClick={() => navigate('/', { replace: true })}>Go to Main Page</button>
                </div>
            </div>
        </>
    )
}