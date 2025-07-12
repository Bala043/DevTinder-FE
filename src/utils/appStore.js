import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../utils/userSlice'
import feedReducer from "../utils/feedSlice"
import requestReducer from "../utils/requestSlice"
import connectionsReducer from "../utils/connectionsSlice"

const appStore=configureStore({
    reducer:{
        user:userReducer,
        feed:feedReducer,
        request:requestReducer,
        connections:connectionsReducer
    }
})
export default appStore