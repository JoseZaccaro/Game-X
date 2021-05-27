import {combineReducers} from "redux";
import usersReducer from './userReducer'



const mainReducer = combineReducers({
    userReducer: usersReducer
})

export default mainReducer