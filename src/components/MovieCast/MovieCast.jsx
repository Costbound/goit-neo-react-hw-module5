import css from './MovieCast.module.css'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCast, imageBaseUrl } from '../../movies-api'
import Loader from '../Loader/Loader'

export default function MovieCast() {
    const [castData, setCastData] = useState()
    const [loading, setLoading] = useState(false)
    const { movieId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await fetchCast(movieId)
                setCastData(data.slice(0, 5))
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [movieId])
    
    return (
        <ul className={css.list}>
            {castData && castData.map(({ id, name, character, profile_path }) => (
                <li key={id}>
                    <img className={css.img} src={imageBaseUrl + profile_path} alt={name} height='300'/>
                    <h3 className={css.actorName}>{name}</h3>
                    {character && <p>{`Character: ${character}`}</p>}
                </li>
            ))}
            {loading && <Loader isNotAbsolute={true} />}
        </ul>
    )
}