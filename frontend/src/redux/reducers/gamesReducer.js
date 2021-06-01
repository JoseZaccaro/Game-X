const initialState = {
    allGames: [],
    gamesFiltered:[] ,
    preLoader: true 
}

const gamesReducer = (state = initialState, action) =>{
    switch(action.type) {
        case 'LOAD_GAMES':
            return {
                ...state, 
                allGames: action.payload,
                preLoader: false
            }
        case 'FILTER_GAMES':
        let filterGamesComplete;
        if (action.payload.flag) {
            if (action.payload.value === '') {
                filterGamesComplete = state.allGames
            }
           filterGamesComplete = state.allGames.filter(game => game.title.toLowerCase().trim().indexOf(action.payload.value) === 0)
           console.log(filterGamesComplete);
        } else{
            if (action.payload.value === 'All') {
            filterGamesComplete= state.allGames
            }else{
                let games = state.allGames.map(game => {
            if (game.genre.some(gameGenre => gameGenre === action.payload.value)) {
                return game
            } else {
                return false
            }
        })
        filterGamesComplete = games.filter(game => game !== false)
            }
         
        }

            return {
                ...state, 
                gamesFiltered: filterGamesComplete
            }
        default:
            return state
    }
}

export default gamesReducer