import css from './MoviesPage.module.css'
import MovieList from '../../components/MovieList/MovieList'
import Loader from '../../components/Loader/Loader'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchSearchMovie } from '../../movies-api'
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage'

export default function MoviesPage() {
    const [movies, setMovies] = useState([])
    const [isFirstRender, setIsFirstRender] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        const value = form.elements.search.value.trim()
        value ? setSearchParams({ query: value }) : alert("Search field connot be empty")
        form.reset()
    }

    useEffect(() => {
        const fetchData = async (searchWord) => {
            if (searchWord) {
                try {
                    setMovies([])
                    setLoading(true)
                    setError(null)
                    const data = await fetchSearchMovie(searchWord)
                    if (searchWord) setIsFirstRender(false)
                    setMovies(data)
                } catch (err) {
                    console.log(err)
                    setError('Failed to fetch movies. Please try again.')
                    console.log(error)
                } finally {
                    setLoading(false)
                }
            }
        }
        fetchData(searchParams.get('query'))
    }, [searchParams])
    
    return (
        <div className={css.container}>
            <form className={css.form} onSubmit={handleSubmit}>
                <input className={css.input} type='text' name='search'/>
                <button type='submit'>Search</button>
            </form>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {movies.length < 1 && !loading && !isFirstRender && !error ?
                <h2>Any movie found by your request</h2> :
                !error && <MovieList movies={movies} />
            }
            {loading && <Loader isNotAbsolute={true} />}
        </div>
    )
}