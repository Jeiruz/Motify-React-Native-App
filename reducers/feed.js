import { FOR_YOU,  LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from '../actions/types'

const initialState = {
    data: [],

}

export default function(state = initialState, action) {
    switch(action.type) {
        case FOR_YOU:
            return {
                ...state,
                data: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case LOGOUT_SUCCESS: {
            return {
                data: []
            }
        }
        default:
            return state
    }
}