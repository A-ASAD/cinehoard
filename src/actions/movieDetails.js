import {
    NOT_FOUND,
    LOAD_MOVIE,
    MOVIE_LOADING,
    UPDATE_FAVOURITE,
    UPDATE_WATCHLIST
} from '../types/movieDetails'


export const notFound = () => ({
    type: NOT_FOUND,
})

export const movieLoading = () =>({
    type: MOVIE_LOADING,
})

export const loadMovie = (payload) => ({
    type: LOAD_MOVIE,
    payload: payload
})

export const updateFavourite = (payload) => ({
    type: UPDATE_FAVOURITE,
    payload: payload
})

export const updateWatchlist = (payload) => ({
    type: UPDATE_WATCHLIST,
    payload: payload
})
