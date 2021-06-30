import { FRIEND_LIST } from './types'
import axios from 'axios'
import { tokenConfig } from './auth'
import { baseURL } from '../components/shared/HelperFunction'


export const friendList = (id) => (dispatch, getState) => {
    axios.get(`${baseURL}/api/friends/list/?limit=${10}&offset=${0}&id=${id}`, tokenConfig(getState))
        .then(res => {
            dispatch({
                type: FRIEND_LIST,
                payload: res.data
            })
        }).catch(err => console.log(err))
}