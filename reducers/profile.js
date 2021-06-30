import { GET_PROFILE, LOGOUT_SUCCESS, UPDATE_PROFILE, UPDATE_PROFILE_IMAGE } from '../actions/types'


const initialState = {
    profile: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_PROFILE:
        case UPDATE_PROFILE:
            return {
                profile: action.payload
            }
        case LOGOUT_SUCCESS: {
            return {
                profile: null
            }
        }
        case UPDATE_PROFILE_IMAGE: {
            const { profile } = state
            profile.image = action.payload
            return {
                profile
            }
        }
        default:
            return state
    }
}
