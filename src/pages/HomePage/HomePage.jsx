import css from './HomePage.module.css'
import Loader from '../../components/Loader/Loader'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchTrends } from '../../movies-api'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function HomePage() {
    const [trends, setTrends] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null)
                setLoading(true)
                const data = await fetchTrends()
                setTrends(data)
            } catch (err) {
                console.log(err)
                setError('Failed to fetch trending movies. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={css.container}>
            <h2 className={css.title}>Trending today</h2>
            {error ? <ErrorMessage>{error}</ErrorMessage> :
                <ul className={css.list}>
                    {trends.map(({ original_title: title, id }) => (
                        <li key={id}>
                            <Link to={`/movies/${id}`} state={{ from: location }}>{title}</Link>
                        </li>
                    ))}
                </ul>}
            {loading && <Loader />}
        </div>
    )
}