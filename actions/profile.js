import { GET_PROFILE, MANY_ACTION, OTHER_USER_ACTION, UPDATE_PROFILE, UPDATE_PROFILE_IMAGE} from './types'
import { tokenConfig } from './auth'
import axios from 'axios'
import { baseURL } from '../components/shared/HelperFunction'

// Getting the individual profile
export const getProfile = (username, callback) => (dispatch, getState) => {
    axios.get(`${baseURL}/api/${username}/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_PROFILE,
                payload: res.data
            })
            callback("fetch")
        }).catch(err => callback("error"))
}

// Follow and Unfollow Action
export const manyAction = (username, action) => (dispatch, getState) => {
    const data = { action: action}
    axios.post(`${baseURL}/api/${username}/follow/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: MANY_ACTION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}


export const otherUserAction = (id, action) => (dispatch, getState) => {
    const data = { action }
    axios.post(`${baseURL}/api/${id}/other-friend/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: OTHER_USER_ACTION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}


export const editProfile = (data, id, callback) => (dispatch, getState) => {
    axios.put(`${baseURL}/api/${id}/update/profile/`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getState().auth.token}`
        },
        onUploadProgress: (progressEvent) => {
            callback(parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100)))
        }
    })
        .then(res => {
            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            })
        }).catch(() => callback(null, "error"))
}

export const editProfileImage = (image, id, callback) => (dispatch, getState) => {
    axios.put(`${baseURL}/api/${id}/update/image/`, { image }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${getState().auth.token}`
        },
        onUploadProgress: (progressEvent) => {
            callback(parseInt(Math.round(progressEvent.loaded / progressEvent.total * 100)))
        }
    }).then(res => {
        const payload = res.data.image.replace(`${baseURL}/`, "/")
        dispatch({
            type: UPDATE_PROFILE_IMAGE,
            payload,
        })
    }).catch(() => callback(null, "error"))
} 