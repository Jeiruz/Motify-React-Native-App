import { ADD_POST, LIKE_ACTION, SHARE_ACTION, USER_POSTS, USER_FEED } from './types'
import axios from 'axios'
import { tokenConfig, fetchToken } from './auth'
import { baseURL } from '../components/shared/HelperFunction'



// Add Post
export const addPost = (fd, callback) => (dispatch, getState) => { 
    axios.post(`${baseURL}/api/post/create/`, fd, {
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
                type: ADD_POST,
                payload: res.data
            })
        }).catch(err => callback(null, "error"))
}

// Add Like
export const addLike = (id, action) => (dispatch, getState) => {
    const data = { id, action }
    let jsonData;
    if (data) {
        jsonData = JSON.stringify(data)
    }
    axios.post(`${baseURL}/api/post/action/`, jsonData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: LIKE_ACTION,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

// Share Action
export const shareAction = (id, content, action, callback) => (dispatch, getState) => {
    const data = { content, id, action }
    let jsonData;
    if (data) {
        jsonData = JSON.stringify(data)
    }
    axios.post(`${baseURL}/api/post/action/`, jsonData, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: SHARE_ACTION,
                payload: res.data
            })
            callback("fetch")
        }).catch(err => callback("error"))
}

// User Posts
export const userPosts = (username) => (dispatch, getState) => {
    axios.get(`${baseURL}/api/user/list/?username=${username}&limit=${20}&offset=${0}`, tokenConfig(getState)) 
        .then(res => {
            dispatch({
                type: USER_POSTS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}


export const deletePost = (id, token) => {
    axios.delete(`${baseURL}/api/post/${id}/delete`, fetchToken(token))
        .then(res => {
            console.log("fuck you")
        })
}
