const cartActions = {
    addToCart: (game) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'ADD_TO_CART', payload: game})
            } catch (error) {             
                console.log(error);
                alert('error en cart action')
            }        
        }
    },
    deleteToCart: (gameId) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'DELETE_TO_CART', payload: gameId})
            } catch (error) {             
                console.log(error);
                alert('error en cart action')
            }        
        }
    }
}
export default cartActions