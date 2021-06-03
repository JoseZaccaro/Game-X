const initialState = {
    userLogged:null,
    favouritesList:null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem("userLogged", JSON.stringify({userName: action.payload.userName, avatar: action.payload.avatar, imageUrl:action.payload.imageUrl}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload,
                favouritesList: action.payload.favouritesList         
            }
        case 'LOG_OUT':
            localStorage.clear()
            return {
                ...state,
                userLogged: null        
            }              

        case "RELOAD_FRIEND_LIST":
            return{
                ...state,
                userLogged:{...state.userLogged,friends:action.payload}
            }
        case "RELOAD_FAVORITES_LIST":
            console.log(action.payload.favouritesList)
            return{
                ...state,
                favouritesList: action.payload.favouritesList  
            }
        default:
            return state
    }
}

export default userReducer