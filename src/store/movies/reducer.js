import {
    LOAD_MOVIES,
    MOVIES_LOADING
} from './types'


const initialState = {
    movies: [],
    isLoading: true,
}

const movies = (state=initialState, action) => {
    switch(action.type){
        case MOVIES_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case LOAD_MOVIES:
            return {
                ...state,
                movies: action.payload,
                isLoading: false,
            }

        default:
            return state
    }
}

export default movies;
