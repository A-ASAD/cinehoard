import {
    LOGIN_USER,
    LOGOUT_USER,
    USER_LOADING
} from '../types/auth'


const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
}

const auth = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                token: action.payload.access,
                user: action.payload.user,
                isAuthenticated: true,
                isLoading: false,
            }

        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            }

        case LOGOUT_USER:
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            }

        default:
            return state
    }
}

export default auth;
