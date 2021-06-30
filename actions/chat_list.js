import { CHAT_LIST } from './types'


export const chatListPersist = (chat) => (dispatch) => {
    dispatch({
        type: CHAT_LIST,
        payload: chat
    })
}