import { NEW_USER } from '../actions/types'

const initialState = {
    data: true

}

export default function(state = initialState, action) {
    switch(action.type) {
        case NEW_USER:
            return {
                data: false
            }
        default:
            return state
    }
}