import { USER_LIST } from './types'

export const userList = (data) => (dispatch) => {
            dispatch({
                type: USER_LIST,
                payload: data
            })
}