import { NEW_USER } from './types'

export const newUser = () => (dispatch) => {
    dispatch({
        type: NEW_USER
    })
}
