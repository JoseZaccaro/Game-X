const initialState = {
    userLogged:null,
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_USER':
            localStorage.setItem("userLogged", JSON.stringify({userName: action.payload.userName, avatar: action.payload.avatar, imageUrl:action.payload.imageUrl}))
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                userLogged: action.payload         
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
        default:
            return state
    }
}

export default userReducer