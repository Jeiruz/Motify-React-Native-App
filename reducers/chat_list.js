import { CHAT_LIST } from '../actions/types'


const initialState = {
    chat_list: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CHAT_LIST:
            return {
                ...state,
                chat_list: action.payload
            }
        default:
            return state
    }
}