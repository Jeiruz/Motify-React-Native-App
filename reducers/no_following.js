import { NO_FOLLOWING, LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
    post: null,
    profile: null

}

export default function(state = initialState, action) {
    switch(action.type) {
        case NO_FOLLOWING:
            return {
                ...state,
                post: action.payload.post,
                profile: action.payload.profile
            }
        case LOGOUT_SUCCESS: {
            return {
                post: null,
                profile: null
            }
        }
        default:
            return state
    }
}