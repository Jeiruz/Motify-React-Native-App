import { CATEGORY, LOGOUT_SUCCESS } from '../actions/types'

const initialState = {
    data: []
}

export default function(state = initialState, action){
  switch(action.type) {
      case CATEGORY:
          return {
              data: action.payload
          }
    case LOGOUT_SUCCESS:
        return {
            data: []
        }
      default:
          return state;
  }
}