import css from './MovieDetailsPage.module.css'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState, useRef } from 'react'
import { useParams, Link, Outlet, useLocation } from 'react-router-dom'
import { fetchDetails, imageBaseUrl } from '../../movies-api'


export default function MovieDetailsPage() {
    const [movieData, setMovieData] = useState()
    const [loading, setLoading] = useState(false)
    const { movieId } = useParams()
    const location = useLocation()
    const backLink = useRef(location.state?.from ?? '/movies')

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchDetails(movieId)
                setMovieData(data)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <div className={css.contentContainer}>
            <Link className={css.backLink} to={backLink.current}>← Go back</Link>
            {movieData &&
                <>
                <div className={css.infoContainer}>
                    <img src={imageBaseUrl + movieData.backdrop_path} alt={movieData.title} widht='500'/>
                    <div>
                        <h2 className={css.mainTitle}>{`${movieData.title} (${movieData.release_date.slice(0, 4)})`}</h2>
                        <p className={css.para}>{`User Score: ${movieData.vote_average}`}</p>
                        <h3 className={css.title}>Overview</h3>
                        <p className={css.para}>{movieData.overview}</p>
                        <h3 className={css.title}>Genres</h3>
                        <p className={css.para}>{movieData.genres.map(genre => genre.name).join(', ')}</p>
                    </div>
                </div>
                <hr />

                <h2 className={css.additionalTitle}>Additional information</h2>
                <ul className={css.additionalList}>
                    <li>
                        <Link to='cast'>Cast</Link>
                    </li>
                    <li>
                        <Link to='reviews'>Reviews</Link>
                    </li>
                </ul>
                <hr />
                <Outlet />
                </>
            }

            {loading && <Loader />}
        </div>
    )
}