import axios from 'axios'
import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS} from './types'
import { baseURL } from '../components/shared/HelperFunction'


// Login user
export const login = (password, email, callback, newUser) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    axios.post(`${baseURL}/api/auth/login`, body, config)
        .then(res => {
            callback("fetch")
            newUser()
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        }).catch(err => callback("error"))
}

export const register = (username, password, email, callback, newUser) => dispatch => {
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ username, password, email })
    axios.post(`${baseURL}/api/auth/register`, body, config)
        .then(res => {
            callback("fetch")
            newUser()
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            })
        }).catch(err => callback("error"))
}

// Logout user
export const logout = () => (dispatch, getState) => {
     axios.post(`${baseURL}/api/auth/logout/`, null, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        }).catch(err => dispatch({
            type: LOGOUT_SUCCESS
        }))
}


// Setup config with token - helper function
export const tokenConfig = getState => {
    // Get token from the state
    const token = getState().auth.token;
    // Headers
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // If token, add to header config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}

export const fetchToken = (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    // If token, add to header config
    if(token) {
        config.headers['Authorization'] = `Token ${token}`;
    }
    return config
}

