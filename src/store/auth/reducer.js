import {
    LOGIN_USER,
    LOGOUT_USER,
    USER_LOADING
} from './types'

const initialState = {
    user: null,
    firstname: null,
    lastname: null,
    email: null,
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
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                email: action.payload.email,
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
                firstname: null,
                lastname: null,
                email: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            }

        default:
            return state
    }
}

export default auth;
