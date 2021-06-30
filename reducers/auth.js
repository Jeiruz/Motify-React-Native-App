import { LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, UPDATE_PROFILE_IMAGE
 } from '../actions/types'
 
 const initialState = {
     token: null,
     user: null
 }
 export default function(state = initialState, action){
   switch(action.type) {
       case LOGIN_SUCCESS:
           return {
               ...state,
               ...action.payload,
           }
       case REGISTER_SUCCESS:
           return {
               ...state,
               ...action.payload,
           }
       case LOGOUT_SUCCESS: 
           return {
               ...state,
               token: null,
               user: null
           }
       case UPDATE_PROFILE_IMAGE: 
           const { user } = state
           user.image = action.payload
           return {
               token: state.token,
               user
           }
       default:
           return state;
   }
 }
 
 
 