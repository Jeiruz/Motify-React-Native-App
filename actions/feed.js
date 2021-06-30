import { FOR_YOU, LOCAL_FEED } from './types'


export const foryouFeed = (data) => (dispatch) => {
    dispatch({
        type: FOR_YOU,
        payload: data
    })
} 

export const localFeed = (data) => (dispatch) => {
    dispatch({
        type: LOCAL_FEED,
        payload: data
    })
}