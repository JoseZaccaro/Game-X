const initialState = {
    allGames: [],
    preLoader: true 
}

const gamesReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_GAMES':
            console.log(action.payload)
            return {
                ...state, 
                allGames: action.payload,
                preLoader: false
            }
        default:
            return state
    }
}

export default gamesReducer