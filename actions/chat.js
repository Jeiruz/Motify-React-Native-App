import { GET_CHATS_SUCCESS,  ADD_CHAT, ADD_MESSAGE} from './types'
import { tokenConfig } from './auth'
import axios from 'axios'
import { baseURL } from '../components/shared/HelperFunction'

export const addChatParticipants = (participants, id, content, sender, callback) => (dispatch, getState) => {
    const data = { content, sender, participants, id }
    axios.post(`${baseURL}/chat/create/`, data, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: ADD_CHAT,
                payload: res.data
            })
            callback(content, "success")
        }).catch(err => callback(content, "error"))
}



export const getUserChats = (username) => (dispatch, getState)  => {
    axios.get(`${baseURL}/chat/?username=${username}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: GET_CHATS_SUCCESS,
                payload: res.data
            })
        }).catch(err => console.log(err))
}

export const addMessage = (user, content, chat_id) => (dispatch, getState) => {
    axios.post(`${baseURL}/chat/create/message/`, { user, content, chat_id }, tokenConfig(getState))
        .then(res => console.log(res.data))
}