import { NO_FOLLOWING } from './types'

export const noFollowing = (profile, post) => (dispatch) => {
    const objectData = { profile, post}
    dispatch({
        type: NO_FOLLOWING,
        payload: objectData
    })
} 