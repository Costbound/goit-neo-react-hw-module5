import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
axios.defaults.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOTE3Y2FmYmM1M2NmNjE0OTdhZDIzYWE3MDA1ZWFiMCIsInN1YiI6IjY2MTJkNDkzMWZhMWM4MDE0OWQxYWFmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.fw23VSEg3ZYUrHcdtG5V67yM59pTD68xZKn0QhObdYg'
axios.defaults.headers['accept'] = 'application/json'

export const imageBaseUrl = 'https://image.tmdb.org/t/p/w500'

export const fetchTrends = async () => {
    const resp = await axios.get('/trending/movie/day')
    return resp.data.results
}

export const fetchDetails = async (id) => {
    const resp = await axios.get(`/movie/${id}`)
    return resp.data
}

export const fetchCast = async (id) => {
    const resp = await axios.get(`/movie/${id}/credits?language=en`)
    return resp.data.cast
}

export const fetchReviews = async (id) => {
    const resp = await axios.get(`/movie/${id}/reviews`)
    return resp.data.results
}

export const fetchSearchMovie = async (searchword) => {
    const resp = await axios.get(`/search/movie?query=${searchword}`)
    return resp.data.results
}