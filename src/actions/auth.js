import {
    LOGIN_USER,
    LOGOUT_USER,
    USER_LOADING
} from '../types/auth'

export const userLogin = (payload) => ({
    type: LOGIN_USER,
    payload: payload
})

export const userLoading = () => ({
    type: USER_LOADING,
})

export const userLogout = () => ({
    type: LOGOUT_USER,
})
