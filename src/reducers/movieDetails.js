import {
    LOAD_MOVIE,
    NOT_FOUND,
    MOVIE_LOADING,
    UPDATE_FAVOURITE,
    UPDATE_WATCHLIST
} from '../types/movieDetails'


const initialState = {
    poster_path: '',
    title: '',
    release_date: '',
    vote_average: 0,
    genres: [],
    overview: '',
    isFavourite: false,
    isInWatchlist: false,
    toggleFavourites: null,
    toggleWatchlist: null,
    isLoading: true,
    notFound: false,
}

const movieDetails = (state=initialState, action) => {
    switch(action.type){
        case NOT_FOUND:
            return {
                ...state,
                notFound: true,
                isLoading: false,
            }

        case LOAD_MOVIE:
            return {
                poster_path: action.payload.poster_path,
                title: action.payload.title,
                release_date: action.payload.release_date,
                vote_average: action.payload.vote_average,
                genres: action.payload.genres,
                overview: action.payload.overview,
                isFavourite: action.payload.isFavourite,
                isInWatchlist: action.payload.isInWatchlist,
                toggleFavourites: action.payload.toggleFavourites,
                toggleWatchlist: action.payload.toggleWatchlist,
                isLoading: false,
            }

        case MOVIE_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case UPDATE_FAVOURITE:
            return {
                ...state,
                isFavourite: action.payload,
            }

        case UPDATE_WATCHLIST:
            return {
                ...state,
                isInWatchlist: action.payload,
            }

        default:
            return state
    }
}

export default movieDetails;
