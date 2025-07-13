import { useState, useEffect } from 'react'
import css from './MovieReviews.module.css'
import { useParams } from 'react-router-dom'
import { fetchReviews } from '../../movies-api'
import Loader from '../Loader/Loader'

export default function MovieReviews() {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(false)
    const { movieId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchReviews(movieId)
                setReviews(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [movieId])

    return (
        <>
            <ul className={css.list}>
                {reviews.length < 1 && !loading ?
                    <li><p>We dont have any reviews for this movie</p></li> :
                    
                    reviews.map(({ author, content, id }) => 
                        <li key={id}>
                            <h3 className={css.author}>{`Author: ${author}`}</h3>
                            <p className={css.comment}>{content}</p>
                        </li>
                )
                }
            </ul>
            {loading && <Loader isNotAbsolute={true} />}
        </>
    )
}