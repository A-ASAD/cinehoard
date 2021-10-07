import { combineReducers } from "redux";

import auth from '../auth/reducer';
import movies from '../movies/reducer'


const rootReducer = combineReducers({
    auth,
    movies,
})

export default rootReducer;
