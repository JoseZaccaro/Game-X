import {combineReducers} from "redux";
import usersReducer from './userReducer'
import hardwareProductsReducer from './hardwareProductsReducer'



const mainReducer = combineReducers({
    userReducer: usersReducer,
    hardwareProductsReducer: hardwareProductsReducer
})

export default mainReducer