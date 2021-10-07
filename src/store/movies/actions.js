import {
    LOAD_MOVIES,
    MOVIES_LOADING
} from './types';


export const loadMovies = (payload) => ({
    type: LOAD_MOVIES,
    payload: payload
})

export const moviesLoading = () => ({
    type: MOVIES_LOADING,
})
