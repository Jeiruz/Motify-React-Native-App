import axios from 'axios'
import { CREATE_COMMENT, REPLY_COMMENT, COMMENT_DETAIL, COMMENT_LIST } from './types'
import { tokenConfig } from './auth'
import { baseURL } from '../components/shared/HelperFunction'

export const commentList = (slug) => (dispatch, getState) => {
    axios.get(`${baseURL}/api/post/${slug}/comments/`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: COMMENT_LIST,
                payload: res.data
            })
        }).catch(err => console.log(err))
}
// This is the next thing that you are gonna work for J.
export const createComments = (content, slug, callback) => (dispatch, getState) => {
    const data = { content }
    let jsonData;
    if (data) {
        jsonData = JSON.stringify(data)
    }
    axios.post(`${baseURL}/api/comments/create/?type=post&slug=${slug}`, jsonData, tokenConfig(getState))
        .then(res => {
            callback("fetch", res.data)
        }).catch(err => callback("error"))
}


export const replyComment = (content, slug, parent_id, callback) => (dispatch, getState) => {
    const data = { content }
    let jsonData;
    if (data) {
        jsonData = JSON.stringify(data)
    }
    axios.post(`${baseURL}/api/comments/create/?type=post&slug=${slug}&parent_id=${parent_id}`, jsonData, tokenConfig(getState))
        .then(res => {
            callback("fetch", res.data)
        }).catch(err => callback("error"))
}

export const commentDetail = (id) => (dispatch, getState) => {
    axios.get(`${baseURL}/api/comments/detail/${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: COMMENT_DETAIL,
                payload: res.data
            })
        }).catch(err => console.log(err))
}
