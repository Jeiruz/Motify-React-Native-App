import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage' 


const initialState = {

};
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth", "chat_list", "profile", "feed", "local_feed", "category", "no_following", "new_user", "users"]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)



const middleware = [thunk]

const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
)
export const persistedStore = persistStore(store)

export default store