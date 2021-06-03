const cartActions = {
    addToCart: (products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'ADD_TO_CART', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en cart action')
            }        
        }
    },
    deleteToCart: (products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'DELETE_TO_CART', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en cart action')
            }        
        }
    },
    setCartLS:(products) => {
        return async (dispatch, getState) => {
            try {
                dispatch({type: 'SET_CART_LS', payload: products})
            } catch (error) {             
                console.log(error);
                alert('error en cart action')
            }        
        }
    },
}
export default cartActions