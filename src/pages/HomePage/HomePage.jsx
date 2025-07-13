import css from './HomePage.module.css'
import Loader from '../../components/Loader/Loader'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { fetchTrends } from '../../movies-api'

export default function HomePage() {
    const [trends, setTrends] = useState([])
    const [loading, setLoading] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchTrends()
                setTrends(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={css.container}>
            <h2 className={css.title}>Trending today</h2>
            <ul className={css.list}>
                {trends.map(({ original_title: title, id }) => (
                    <li key={id}>
                        <Link to={`/movies/${id}`} state={{from: location}}>{title}</Link>
                    </li>
                ))}
            </ul>
            {loading && <Loader />}
        </div>
    )
}