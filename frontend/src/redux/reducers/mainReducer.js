import {combineReducers} from "redux";
import usersReducer from './userReducer'
import hardwareReducer from './hardwareReducer'
import gamesReducer from './gamesReducer'



const mainReducer = combineReducers({
    userReducer: usersReducer,
    hardwareReducer: hardwareReducer,
    gamesReducer: gamesReducer

})

export default mainReducer