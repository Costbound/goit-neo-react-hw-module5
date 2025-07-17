import { useState, useEffect } from 'react'
import css from './MovieReviews.module.css'
import { useParams } from 'react-router-dom'
import { fetchReviews } from '../../movies-api'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'

export default function MovieReviews() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const { movieId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setError(null)
                setLoading(true)
                const data = await fetchReviews(movieId)
                setReviews(data)
            } catch (err) {
                console.log(err)
                setError('Failed to fetch movie reviews. Please try again.')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [movieId])

    return (
        <>
            {loading && <Loader isNotAbsolute={true} />}
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {!loading && !error && (
                <ul className={css.list}>
                    {reviews.length < 1 ? (
                        <li><p>We don't have any reviews for this movie</p></li>
                    ) : (
                        reviews.map(({ author, content, id }) => (
                            <li key={id}>
                                <h3 className={css.author}>{`Author: ${author}`}</h3>
                                <p className={css.comment}>{content}</p>
                            </li>
                        ))
                    )}
                </ul>
            )}
        </>
    )
}