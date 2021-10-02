import { combineReducers } from "redux";

import auth from './auth';
import movieDetails from "./movieDetails";
import movies from './movies'


const rootReducer = combineReducers({
    auth,
    movieDetails,
    movies,
})

export default rootReducer;
