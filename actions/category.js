import { CATEGORY } from './types'

export const categoryPersist = (data) => (dispatch) => {
    dispatch({
        type: CATEGORY,
        payload: data
    })
}