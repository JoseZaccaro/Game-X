import axios from 'axios'

const gamesActions = {
    loadGames: () => {
        return async (dispatch, getState) => {
            try {
                const response = await axios.get('http://localhost:4000/api/games')
                dispatch({type: 'LOAD_GAMES', payload: response.data.response})
            } catch (error) {             
                console.log(error);
                alert('error en games action')
            }        
        }
    },
    filterGames: (filterBy,product, flag)=>{
        return async (dispatch, getState)=>{
            dispatch({ type: 'FILTER_GAMES', payload: {value: filterBy,product:product, flag: flag} })
            try {
            } catch (error) {
                
                console.log(error);
            }
        }
    }
}
export default gamesActions