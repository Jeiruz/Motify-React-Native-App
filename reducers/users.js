import { USER_LIST, LOGOUT_SUCCESS } from '../actions/types'


const initialState = {
    users: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LIST:
            return {
                ...state,
                users: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                users: []
            }
        default:
            return state
    }
}