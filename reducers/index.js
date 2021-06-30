import { combineReducers } from 'redux'
import auth from './auth'
import profile from './profile'
import feed from './feed'
import local_feed from './local_feed'
import chat_list from './chat_list'
import category from './category'
import no_following from './no_following'
import new_user from './new'
import users from './users'


export default combineReducers({
    auth,
    profile,
    feed,
    local_feed,
    chat_list,
    category,
    no_following,
    new_user,
    users
})